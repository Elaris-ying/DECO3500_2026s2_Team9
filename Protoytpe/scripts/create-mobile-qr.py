"""生成公开手机展览入口、可选实体手环连接二维码与独立打印卡。"""

from __future__ import annotations

import argparse
import base64
import hashlib
import html
import ipaddress
import json
from pathlib import Path
import re
from urllib.parse import quote, urlsplit, urlunsplit

from PIL import Image, ImageDraw
from reportlab import Version as REPORTLAB_VERSION
from reportlab.graphics.barcode import qrencoder


PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_ROOT / "mobile-qr"
QUIET_MODULES = 4
PIXELS_PER_MODULE = 16
INK = (0, 0, 0)
WHITE = (255, 255, 255)
WIFI_PAYLOAD = "WIFI:T:nopass;S:GalleryEchoes;;"
LOCAL_CONTROL_URL = "http://192.168.4.1/?screen=device"


# 主入口必须显式提供公开 HTTPS 地址；仅在人工指定 --local 时保留旧本地模式。
def validate_app_url(value: str, *, allow_local: bool = False) -> str:
    if not value or value != value.strip() or any(ord(char) < 33 or ord(char) == 127 for char in value):
        raise ValueError("入口地址不能为空，也不能含空白或控制字符。")
    if "\\" in value or re.search(r"%(?![0-9a-fA-F]{2})", value):
        raise ValueError("入口地址含无效的反斜线或百分号编码。")
    parsed = urlsplit(value)
    if parsed.username is not None or parsed.password is not None or not parsed.hostname:
        raise ValueError("入口地址必须有主机名，不能包含用户名或密码。")
    try:
        port = parsed.port
        host = parsed.hostname.encode("idna").decode("ascii").lower().rstrip(".")
    except (ValueError, UnicodeError) as error:
        raise ValueError("入口地址的主机名或端口无效。") from error
    try:
        address = ipaddress.ip_address(host)
        is_local = not address.is_global
        host_for_url = f"[{host}]" if address.version == 6 else host
    except ValueError:
        if len(host) > 253 or any(not re.fullmatch(r"[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?", label) for label in host.split(".")):
            raise ValueError("入口地址的域名格式无效。")
        is_local = "." not in host or host == "localhost" or host.endswith((".localhost", ".local", ".lan", ".internal", ".home", ".test", ".invalid", ".example"))
        host_for_url = host
    if allow_local:
        if parsed.scheme not in {"http", "https"}:
            raise ValueError("--local 仅接受 HTTP 或 HTTPS 网页地址。")
    elif parsed.scheme != "https" or is_local:
        raise ValueError("公开主二维码必须使用公共 HTTPS 地址；本地地址仅限显式 --local 测试。")
    netloc = host_for_url + (f":{port}" if port is not None else "")
    path = quote(parsed.path or "/", safe="/:@!$&'()*+,;=-._~%")
    query = quote(parsed.query, safe="=&/:?@!$'()*+,;~-._%")
    fragment = quote(parsed.fragment, safe="=&/:?@!$'()*+,;~-._%")
    return urlunsplit((parsed.scheme, netloc, path, query, fragment))


# ReportLab 负责标准 QR 编码；PNG 与 SVG 都直接由同一模块矩阵生成。
def make_matrix(payload: str) -> list[list[bool]]:
    qr = qrencoder.QRCode(None, qrencoder.QRErrorCorrectLevel.M)
    qr.addData(payload)
    qr.make()
    count = qr.getModuleCount()
    return [[bool(qr.isDark(row, column)) for column in range(count)] for row in range(count)]


# 使用整数像素块，保留四个模块纯白边距，不缩放、不做抗锯齿或图案装饰。
def save_png(matrix: list[list[bool]], target: Path) -> tuple[int, int]:
    side = (len(matrix) + QUIET_MODULES * 2) * PIXELS_PER_MODULE
    image = Image.new("RGB", (side, side), WHITE)
    drawing = ImageDraw.Draw(image)
    for row, modules in enumerate(matrix):
        for column, dark in enumerate(modules):
            if dark:
                left = (column + QUIET_MODULES) * PIXELS_PER_MODULE
                top = (row + QUIET_MODULES) * PIXELS_PER_MODULE
                drawing.rectangle((left, top, left + PIXELS_PER_MODULE - 1, top + PIXELS_PER_MODULE - 1), fill=INK)
    image.save(target, "PNG", optimize=True)
    return image.size


# SVG 使用无损方格与白底，可直接放大或打印；载荷保留在可读元数据内。
def save_svg(matrix: list[list[bool]], payload: str, target: Path) -> None:
    size = len(matrix) + QUIET_MODULES * 2
    commands = []
    for row, modules in enumerate(matrix):
        for column, dark in enumerate(modules):
            if dark:
                x, y = column + QUIET_MODULES, row + QUIET_MODULES
                commands.append(f"M{x} {y}h1v1h-1z")
    escaped = html.escape(payload, quote=True)
    source = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{size * PIXELS_PER_MODULE}" height="{size * PIXELS_PER_MODULE}" viewBox="0 0 {size} {size}" role="img" aria-labelledby="qr-title qr-description" shape-rendering="crispEdges">
  <title id="qr-title">Gallery Echoes QR code</title>
  <desc id="qr-description">{escaped}</desc>
  <metadata>{escaped}</metadata>
  <rect width="{size}" height="{size}" fill="#fff"/>
  <path d="{"".join(commands)}" fill="#000"/>
</svg>
'''
    target.write_text(source, encoding="utf-8")


# 核对导出的实际 PNG：只有黑白两色，边距完整，像素块逐格匹配编码矩阵。
def verify_png(matrix: list[list[bool]], target: Path) -> dict:
    with Image.open(target) as original:
        image = original.convert("RGB")
    side = (len(matrix) + QUIET_MODULES * 2) * PIXELS_PER_MODULE
    assert image.size == (side, side), "PNG 尺寸与模块矩阵不符"
    colours = image.getcolors(maxcolors=3)
    assert colours and {colour for _, colour in colours} == {INK, WHITE}, "PNG 存在灰边或额外颜色"
    padding = QUIET_MODULES * PIXELS_PER_MODULE
    for box in [(0, 0, side, padding), (0, side - padding, side, side), (0, 0, padding, side), (side - padding, 0, side, side)]:
        assert image.crop(box).getextrema() == ((255, 255), (255, 255), (255, 255)), "二维码白色边距不完整"
    for row, modules in enumerate(matrix):
        for column, dark in enumerate(modules):
            pixel = image.getpixel(((column + QUIET_MODULES) * PIXELS_PER_MODULE + 8, (row + QUIET_MODULES) * PIXELS_PER_MODULE + 8))
            assert pixel == (INK if dark else WHITE), "PNG 像素与 QR 编码矩阵不符"
    expected_black = sum(sum(row) for row in matrix) * PIXELS_PER_MODULE**2
    assert dict((colour, count) for count, colour in colours)[INK] == expected_black, "黑色模块面积不符"
    return {"pixel_dimensions": [side, side], "matrix_matches_png": True, "quiet_zone_white": True, "only_black_and_white_pixels": True}


def data_uri(target: Path) -> str:
    return "data:image/png;base64," + base64.b64encode(target.read_bytes()).decode("ascii")


# 操作卡的图片内嵌，离线复制单个 HTML 仍可显示和打印，不依赖字体或图像服务器。
def save_card(app_url: str, *, local_mode: bool, include_local_control: bool) -> None:
    wifi = data_uri(OUTPUT_DIR / "gallery-echoes-wifi-qr.png")
    app = data_uri(OUTPUT_DIR / "gallery-echoes-app-qr.png")
    source = '''<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gallery Echoes · 手机连接卡 / Mobile scan card</title>
<style>
:root{color-scheme:light;font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:#322e27;background:#e9e4d9}
*{box-sizing:border-box}body{margin:0;padding:40px 22px}main{max-width:1040px;margin:auto;padding:42px 48px 32px;background:#f7f3ec;border:1px solid #d8cfbf;border-radius:22px;box-shadow:0 18px 60px #4f412315}
.brand{display:flex;align-items:center;justify-content:space-between;gap:18px;padding-bottom:24px;border-bottom:1px solid #d9d0c0}.monogram{font:italic 40px/1 Georgia,serif;letter-spacing:-4px;padding-right:5px}.brand small{font-size:10px;letter-spacing:.16em;color:#8b7f6b}.eyebrow{margin:28px 0 12px;font-size:10px;letter-spacing:.13em;color:#8a7d65}
h1{margin:0;font:400 40px/1.3 Georgia,"STSong","Songti SC",serif;letter-spacing:-1px}header>p{margin:15px 0 0;color:#857761;font-size:13px;line-height:1.9}.english-title{font-family:Georgia,serif;font-size:22px;color:#8a7b62}
.steps{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:31px}.step{min-width:0;padding:24px 23px 22px;border:1px solid #dcd2c1;border-radius:18px;background:#fffdf8}.step-heading{display:flex;gap:13px;align-items:flex-start}.number{display:grid;place-items:center;flex:0 0 31px;height:31px;border:1px solid #d7cbb6;border-radius:50%;font:14px Georgia,serif;color:#887452}.step h2{margin:0;font-size:17px;font-weight:500;line-height:1.5}.step h2 span{display:block;margin-top:4px;font:16px/1.4 Georgia,serif;color:#9a896d}.qr{display:block;width:100%;max-width:296px;height:auto;margin:21px auto 16px;background:#fff;image-rendering:pixelated}.address{display:block;text-align:center;font:13px/1.6 "Consolas","SFMono-Regular",monospace;color:#5b4e38;overflow-wrap:anywhere}.instruction{margin:12px 0 0;font-size:11px;line-height:1.9;color:#82735b}.instruction span{display:block;color:#a08e71;font-size:10px}.tag{display:inline-block;margin-top:11px;padding:4px 9px;border:1px solid #e1d8c8;border-radius:20px;font-size:9px;letter-spacing:.03em;color:#8c7c60;background:#f6f1e7}.optional{margin:0 0 15px;color:#8a7b62;font-size:11px}.control-panel{display:grid;grid-template-columns:130px 1fr;align-items:center;gap:20px;margin-top:22px;padding:18px 22px;border:1px solid #dcd2c1;border-radius:18px;break-inside:avoid}.control-panel .qr{width:130px;margin:0}.control-panel h2{font-size:14px;font-weight:500;margin:0 0 6px}.control-panel .address{text-align:left;font-size:11px}
footer{margin-top:26px;padding-top:20px;border-top:1px solid #d9d0c0}.note{margin:0;font-size:11px;line-height:1.95;color:#7d705b}.note strong{font-weight:500;color:#62543d}.footline{display:flex;justify-content:space-between;gap:20px;margin-top:17px;font-size:9px;line-height:1.8;letter-spacing:.02em;color:#a39172}
@media(max-width:680px){body{padding:15px}main{padding:27px 21px 24px}.brand{padding-bottom:19px}.brand small{font-size:8px}h1{font-size:31px}.english-title{font-size:19px}.steps{grid-template-columns:1fr;gap:16px}.step{padding:22px}.qr{max-width:296px}.footline{flex-direction:column;gap:3px}}
@page{size:A4 portrait;margin:15mm}@media print{html,body{background:#fff}body{padding:0}main{max-width:none;padding:0;border:0;border-radius:0;box-shadow:none;background:#fff}.brand{padding-bottom:6mm}.eyebrow{margin-top:7mm}h1{font-size:27px}header>p{font-size:10px}.english-title{font-size:17px}.steps{grid-template-columns:1fr 1fr;gap:5mm;margin-top:8mm}.step{break-inside:avoid;padding:6mm 4mm;border-radius:4mm;background:#fff}.step h2{font-size:13px}.step h2 span{font-size:13px}.qr{width:65mm;max-width:100%;margin:5mm auto}.address{font-size:12px}.instruction{font-size:9px}.instruction span{font-size:8px}.tag{font-size:8px}footer{margin-top:7mm;padding-top:5mm}.note{font-size:9px}.footline{font-size:8px}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head>
<body><main>
<div class="brand"><span class="monogram" aria-label="Gallery Echoes">ge.</span><small>GALLERY ECHOES · MOBILE COMPANION</small></div>
<header><p class="eyebrow">YOUR VISIT, AT YOUR OWN PACE</p><h1>把展厅，带到手心。<br><span class="english-title">A gallery companion, in your hand.</span></h1><p>__INTRO__</p></header>
<div class="steps">
__STEPS__
</div>
__LOCAL_CONTROL__
<footer><p class="note">__FOOTNOTE__</p><div class="footline"><span>无须下载应用 · 扫码后按手机提示确认<br>No app download · Follow your phone's scan prompt</span><span>SEE ART. SHARE PERSPECTIVES. LEAVE YOUR ECHO.</span></div></footer>
</main></body></html>
'''
    escaped_url = html.escape(app_url, quote=True)
    with Image.open(OUTPUT_DIR / "gallery-echoes-app-qr.png") as image:
        app_size = image.width
    with Image.open(OUTPUT_DIR / "gallery-echoes-wifi-qr.png") as image:
        wifi_size = image.width
    app_step = f'''<section class="step"><div class="step-heading"><span class="number">{'02' if local_mode else '01'}</span><h2>打开完整展览<span>Open your gallery</span></h2></div><img class="qr" src="{app}" width="{app_size}" height="{app_size}" alt="打开 Gallery Echoes 手机展览的二维码"><a class="address" href="{escaped_url}">{escaped_url}</a><p class="instruction">{'连接 GalleryEchoes 后再扫码，并在浏览器打开。' if local_mode else '使用手机流量或家中 Wi-Fi 扫码，即可浏览完整展览，无须登录。'}<span>{'Join GalleryEchoes, then scan and open in your browser.' if local_mode else 'Scan with mobile data or your usual Wi-Fi. Explore the full gallery without signing in.'}</span></p><span class="tag">{'本地测试入口 · Local test entry' if local_mode else '公开手机网页 · Public mobile web app'}</span></section>'''
    wifi_step = f'''<section class="step"><div class="step-heading"><span class="number">{'01' if local_mode else '02'}</span><h2>{'连接手环 Wi-Fi' if local_mode else '体验实体手环时'}<span>{'Join the wristband Wi-Fi' if local_mode else 'With a physical wristband'}</span></h2></div><p class="optional">{'本地模式需要连接。' if local_mode else '可选步骤 · 仅实体控灯需要 / Optional · light control only'}</p><img class="qr" src="{wifi}" width="{wifi_size}" height="{wifi_size}" alt="连接 GalleryEchoes 无密码 Wi-Fi 的二维码"><code class="address">GalleryEchoes</code><p class="instruction">{'扫码加入网络，或在 Wi-Fi 设置中手动选择。' if local_mode else '先在 Wi-Fi 设置中加入 GalleryEchoes（或扫描此码），再回到已打开的展览网页，点 Open wristband control。'}<span>{'Scan to join, or choose the network in Wi-Fi settings.' if local_mode else 'Join GalleryEchoes in Wi-Fi settings or scan here. Return to the gallery tab and tap Open wristband control.'}</span></p><span class="tag">无密码 · No password</span></section>'''
    local_control = ""
    if include_local_control:
        local_png = OUTPUT_DIR / "gallery-echoes-local-control-qr.png"
        with Image.open(local_png) as image:
            local_size = image.width
        local_control = f'''<section class="control-panel"><img class="qr" src="{data_uri(local_png)}" width="{local_size}" height="{local_size}" alt="加入 GalleryEchoes 后打开本地手环控制页的二维码"><div><h2>本地控灯备用入口 · Local light control</h2><a class="address" href="{html.escape(LOCAL_CONTROL_URL, quote=True)}">{html.escape(LOCAL_CONTROL_URL)}</a><p class="instruction">仅在已连接 GalleryEchoes、板子已开启时使用。<span>Use after joining GalleryEchoes, with the board powered on.</span></p></div></section>'''
    replacements = {
        "__INTRO__": "按顺序加入手环 Wi-Fi，再打开本地测试界面。<br>Join the wristband Wi-Fi, then open the local test interface." if local_mode else "扫码即可开始看展，使用你平常的网络。实体手环体验可稍后连接。<br>Scan to explore on your usual network. Connect a physical wristband only when you need it.",
        "__STEPS__": wifi_step + app_step if local_mode else app_step + wifi_step,
        "__LOCAL_CONTROL__": local_control,
        "__FOOTNOTE__": "<strong>本地测试模式：看到“无互联网”属正常现象。</strong>板子需持续供电，手机需连接 GalleryEchoes。<br>Local test mode: “No Internet” is expected. Keep the board powered and stay on GalleryEchoes." if local_mode else "<strong>浏览展览只需互联网，无须连接手环网络。</strong>实体控灯才需要已供电的板子与 GalleryEchoes Wi-Fi；该网络显示“无互联网”属正常现象。<br>Browse the gallery with Internet access. Physical light control needs a powered board and GalleryEchoes Wi-Fi; “No Internet” on that network is expected.",
    }
    for token, value in replacements.items():
        source = source.replace(token, value)
    (OUTPUT_DIR / "scan-card.html").write_text(source, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--app-url", required=True, help="已部署的公开 HTTPS 手机展览地址，无默认地址。")
    parser.add_argument("--include-local-control", action="store_true", help="额外生成实体交付用本地控灯二维码。")
    parser.add_argument("--local", action="store_true", help="显式允许旧本地测试入口；不能将此模式当作公开展览入口。")
    arguments = parser.parse_args()
    try:
        app_url = validate_app_url(arguments.app_url, allow_local=arguments.local)
    except ValueError as error:
        parser.error(str(error))
    payloads = {"gallery-echoes-app-qr": app_url, "gallery-echoes-wifi-qr": WIFI_PAYLOAD}
    if arguments.include_local_control:
        payloads["gallery-echoes-local-control-qr"] = LOCAL_CONTROL_URL
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    entries = []
    for name, payload in payloads.items():
        matrix = make_matrix(payload)
        png = OUTPUT_DIR / f"{name}.png"
        svg = OUTPUT_DIR / f"{name}.svg"
        save_png(matrix, png)
        save_svg(matrix, payload, svg)
        verified = verify_png(matrix, png)
        entries.append({
            "name": name, "payload": payload, "error_correction": "M", "qr_version": (len(matrix) - 17) // 4,
            "core_modules": len(matrix), "quiet_zone_modules": QUIET_MODULES, "pixels_per_module": PIXELS_PER_MODULE,
            **verified,
            "png_sha256": hashlib.sha256(png.read_bytes()).hexdigest(),
            "svg_sha256": hashlib.sha256(svg.read_bytes()).hexdigest(),
            "matrix_sha256": hashlib.sha256("\n".join("".join("1" if dark else "0" for dark in row) for row in matrix).encode("ascii")).hexdigest(),
        })
    # 公开入口另存明确的 online 文件名，避免与旧聊天中保存的本地二维码混淆。
    aliases = []
    if not arguments.local:
        alias_names = ["gallery-echoes-online-qr"]
        # 迁移后另存平台专用文件名，便于识别新码并避免旧聊天图片缓存。
        if (urlsplit(app_url).hostname or "").endswith(".netlify.app"):
            alias_names.append("gallery-echoes-netlify-qr")
        for extension in ("png", "svg"):
            original = OUTPUT_DIR / f"gallery-echoes-app-qr.{extension}"
            for alias_name in alias_names:
                alias = OUTPUT_DIR / f"{alias_name}.{extension}"
                alias.write_bytes(original.read_bytes())
                aliases.append({"name": alias.name, "source": original.name, "payload": app_url, "sha256": hashlib.sha256(alias.read_bytes()).hexdigest()})
    save_card(app_url, local_mode=arguments.local, include_local_control=arguments.include_local_control)
    metadata = {
        "generator": f"ReportLab {REPORTLAB_VERSION} QR encoder; Pillow integer-pixel raster",
        "mode": "explicit-local-test" if arguments.local else "public-https",
        "app_url": app_url,
        "artifacts": entries,
        "public_aliases": aliases,
        "scan_card": "scan-card.html",
        "verification": "PNG pixels, complete white quiet zone and encoded matrix checked. No independent QR decoder or real phone scan has been used.",
        "limits": "Public gallery browsing uses the visitor's Internet connection and does not require GalleryEchoes Wi-Fi. Physical light control separately requires a powered board and joining GalleryEchoes. The optional local control QR is not a public gallery link." if not arguments.local else "Explicit local test mode: the phone must join GalleryEchoes and the board must remain powered. This is not a public Internet gallery entry.",
    }
    (OUTPUT_DIR / "metadata.json").write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(metadata, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
