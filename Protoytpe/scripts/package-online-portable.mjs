import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// Sites 源码助手已提交并推送；Windows 无 bash 时，沿用官方 staging 工具与系统 tar。
// 不修改插件，不重新提交、不接触认证信息；打包前后都要求源码与已推送提交一致。
const root = fileURLToPath(new URL('../', import.meta.url));
const site = path.join(root, 'online-site');
const archive = path.join(root, 'deliverables/gallery-echoes-online.tar.gz');
const stage = path.join(root, '.online-package-stage');
const prepare = 'C:/Users/yf/.codex/plugins/cache/openai-curated-remote/sites/1.0.2-remix-a.1/skills/sites/scripts/prepare-site-build.cjs';
const git = args => execFileSync('git', args, { cwd: site, windowsHide: true, encoding: 'utf8' }).trim();
assert.equal(git(['status', '--porcelain']), '', 'Source changed after the Sites helper push; push the exact updated state before packaging.');
const commit = git(['rev-parse', 'HEAD']);
assert.match(commit, /^[0-9a-f]{40}$/);
const hosting = JSON.parse(fs.readFileSync(path.join(site, '.openai/hosting.json'), 'utf8'));
assert.ok(hosting.project_id && hosting.static?.directory === 'dist');
fs.mkdirSync(stage, { recursive: true });
assert.ok(!fs.existsSync(path.join(stage, 'dist')), 'Preserve an earlier staging folder; choose a fresh stage for a new publish.');
const kind = execFileSync(process.execPath, [prepare, site, path.join(stage, 'dist')], { windowsHide: true, encoding: 'utf8' }).trim();
assert.equal(kind, 'static');
assert.ok(fs.existsSync(path.join(stage, 'dist/index.html')));
const staged = JSON.parse(fs.readFileSync(path.join(stage, 'dist/.openai/hosting.json'), 'utf8'));
assert.equal(staged.project_id, hosting.project_id);
fs.mkdirSync(path.dirname(archive), { recursive: true });
execFileSync('tar', ['-czf', archive, '-C', stage, 'dist'], { windowsHide: true });
const files = execFileSync('tar', ['-tzf', archive], { windowsHide: true, encoding: 'utf8' }).split(/\r?\n/);
assert.ok(files.includes('dist/.openai/hosting.json') && files.includes('dist/index.html'));
assert.equal(git(['status', '--porcelain']), '');
assert.equal(git(['rev-parse', 'HEAD']), commit);
console.log(JSON.stringify({ project_id: hosting.project_id, checkout_path: site, commit_sha: commit, archive, fileCount: files.filter(Boolean).length }, null, 2));
