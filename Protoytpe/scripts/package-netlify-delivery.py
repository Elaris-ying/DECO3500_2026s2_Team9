"""打包当前 Netlify 二维码与已完成 SDK 编译的固件；不发布、也不修改固件。"""
from pathlib import Path
from hashlib import sha256
import json
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
deliverables = root / 'deliverables'
expected_url = 'https://gallery-echoes-mobile.netlify.app/'
verification = json.loads((deliverables / 'netlify-public-verification.json').read_text(encoding='utf-8-sig'))
assert verification['publicUrl'] == expected_url
assert verification['unauthenticatedStaticAccessVerified'] is True
assert verification['applicationFileCount'] == 40
qr_metadata = json.loads((root / 'mobile-qr/metadata.json').read_text(encoding='utf-8'))
assert qr_metadata['app_url'] == expected_url
decoder = json.loads((root / 'mobile-qr/independent-decode.json').read_text(encoding='utf-8'))
assert decoder['independentDecodePassed'] is True

# 与当前完成 SDK 编译的文件核对，避免把未编译的新固件打入交付包。
compilation = json.loads((root / '.firmware-build/compile-report.json').read_text(encoding='utf-8-sig'))
version = compilation['firmware']
mobile_manifest = json.loads((root / 'mobile-export/mobile-manifest.json').read_text(encoding='utf-8'))
assert mobile_manifest['firmwareVersion'] == version
for name, field in [('gallery_echoes_wifi.ino', 'sourceSha256'), ('mobile_assets.h', 'mobileAssetsSha256')]:
    source = root / 'firmware/gallery_echoes_wifi' / name
    assert sha256(source.read_bytes()).hexdigest() == compilation[field], f'固件已变化，需重新验证：{name}'

native_deploy = json.loads((deliverables / 'netlify-deployment.json').read_text(encoding='utf-8-sig'))
assert native_deploy['url'].rstrip('/') == expected_url.rstrip('/')
native_deploy.update({
    'platform': 'Netlify', 'accountPlanVerified': 'Free', 'access': 'public',
    'publicVerification': 'netlify-public-verification.json',
    'publicVerifiedAt': verification['verifiedAt'],
    'appQr': 'mobile-qr/gallery-echoes-netlify-qr.png',
    'qrSha256': sha256((root / 'mobile-qr/gallery-echoes-netlify-qr.png').read_bytes()).hexdigest(),
})
(deliverables / 'netlify-deployment.json').write_text(json.dumps(native_deploy, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

files = [
    'firmware/gallery_echoes_wifi/gallery_echoes_wifi.ino',
    'firmware/gallery_echoes_wifi/mobile_assets.h', 'firmware/README.md',
    'MOBILE-SETUP.md', 'NETLIFY-SETUP.md',
]
if (root / 'RETURN-TO-GALLERY.md').is_file():
    files.append('RETURN-TO-GALLERY.md')
files += ['mobile-qr/' + path.name for path in sorted((root / 'mobile-qr').iterdir()) if path.is_file() and path.suffix in {'.png', '.svg', '.json', '.html'}]
for filename in ['netlify-deployment.json', 'netlify-site-registration.json', 'netlify-public-verification.json']:
    files.append('deliverables/' + filename)
assert len(files) == len(set(files))
for filename in ['MOBILE-SETUP.md', 'NETLIFY-SETUP.md', 'firmware/README.md']:
    assert expected_url in (root / filename).read_text(encoding='utf-8-sig'), f'说明尚未更新：{filename}'
readme = f'''# Gallery Echoes · Netlify 手机入口与可选实体灯

公开入口：{expected_url}

访客无需登录，也不需要先连设备 Wi-Fi。主码见 mobile-qr/gallery-echoes-netlify-qr.png，打印卡见 mobile-qr/scan-card.html。
需要控制实体灯时，在 Colour studio 选择颜色 → Connect a wristband → 手机加入 GalleryEchoes（无密码）→ 返回页面 Open wristband controls → Connect your light。

当前板载版本为 {version}。设备页顶部“返回画廊”可在设备 Wi-Fi 下回到完整画廊；在线画廊会保留在原标签页。旧版设备需要将 .ino 和 mobile_assets.h 放在同一目录，通过 Arduino IDE Upload 一次才能显示新按钮，仅刷新网站不能更新板子。
返回前会保留当前灯色、亮度和开关并停下演示。若要回到在线访问记录，可回原画廊标签页，或恢复互联网后选择“返回在线画廊”。公开网址与二维码不变。
详细使用见 MOBILE-SETUP.md；Netlify 站点维护见 NETLIFY-SETUP.md。此交付包不含完整可编辑网页源码，源码仍在原项目中。
40 个公开应用文件与二维码独立解码均已核验。尚未替用户进行真实手机扫码或实体灯现场联调。
'''
archive = deliverables / f'Gallery-Echoes-Mobile-Netlify-{version}.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED, compresslevel=9) as package:
    for filename in files:
        package.write(root / filename, filename)
    package.writestr('README-Chinese.md', readme)

# 回读压缩包实际内容，逐一比对源文件与关键二维码载荷。
with ZipFile(archive) as package:
    assert package.testzip() is None
    for filename in files:
        assert package.read(filename) == (root / filename).read_bytes(), filename
    embedded_qr = json.loads(package.read('mobile-qr/metadata.json'))
    assert embedded_qr['app_url'] == expected_url
print(json.dumps({'archive': str(archive), 'files': len(files) + 1, 'bytes': archive.stat().st_size, 'firmwareMatchesCompileReport': True, 'qrUrl': expected_url}, ensure_ascii=False, indent=2))
