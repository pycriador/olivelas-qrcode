#!/usr/bin/env python3
"""
Olivelas QR Code Studio - CLI Generator
Gera códigos QR Code em alta definição diretamente da linha de comando,
com suporte a encurtamento automático de URL e personalização de cores.

Instalação de pré-requisitos:
    pip install qrcode[pil] requests
"""

import sys
import argparse
import urllib.parse
try:
    import requests
except ImportError:
    requests = None

try:
    import qrcode
    from PIL import Image
except ImportError:
    qrcode = None

def shorten_url(url: str, provider: str = "tinyurl") -> str:
    """Encurta a URL informada usando o provedor solicitado."""
    if not requests:
        print("[AVISO] Pacote 'requests' não instalado. Usando a URL original.")
        return url

    print(f"[*] Encurtando URL via {provider}...")
    try:
        if provider == "tinyurl":
            api = f"https://tinyurl.com/api-create.php?url={urllib.parse.quote(url)}"
            resp = requests.get(api, timeout=6)
            if resp.status_code == 200 and resp.text.startswith("http"):
                return resp.text.strip()
        elif provider == "isgd":
            api = f"https://is.gd/create.php?format=simple&url={urllib.parse.quote(url)}"
            resp = requests.get(api, timeout=6)
            if resp.status_code == 200 and resp.text.startswith("http"):
                return resp.text.strip()
        elif provider == "dagd":
            api = f"https://da.gd/s?url={urllib.parse.quote(url)}"
            resp = requests.get(api, timeout=6)
            if resp.status_code == 200 and resp.text.startswith("http"):
                return resp.text.strip()
    except Exception as e:
        print(f"[!] Erro ao encurtar ({e}). Usando URL original.")
    return url

def generate_qr(url: str, output: str, fill_color: str, back_color: str, box_size: int):
    """Gera o QR Code com biblioteca nativa ou fallback cURL/API."""
    if qrcode is not None:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=box_size,
            border=2,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill_color=fill_color, back_color=back_color)
        img.save(output)
        print(f"[OK] QR Code gerado e salvo com sucesso em: {output}")
    else:
        # Fallback via download HTTP direto se qrcode não estiver instalado no ambiente
        print("[*] Pacote 'qrcode' não detectado localmente. Baixando via API de alta definição...")
        clean_color = fill_color.replace("#", "")
        clean_bg = back_color.replace("#", "")
        safe_url = urllib.parse.quote(url)
        endpoint = f"https://api.qrserver.com/v1/create-qr-code/?size={box_size * 40}x{box_size * 40}&color={clean_color}&bgcolor={clean_bg}&data={safe_url}"
        
        if requests:
            res = requests.get(endpoint)
            with open(output, "wb") as f:
                f.write(res.content)
            print(f"[OK] QR Code baixado via API e salvo em: {output}")
        else:
            import urllib.request
            urllib.request.urlretrieve(endpoint, output)
            print(f"[OK] QR Code baixado e salvo em: {output}")

def main():
    parser = argparse.ArgumentParser(description="Olivelas QR Code Studio - Gerador de Terminal")
    parser.add_argument("--url", "-u", required=True, help="URL ou texto a ser codificado")
    parser.add_argument("--output", "-o", default="qrcode.png", help="Nome do arquivo de saída (padrão: qrcode.png)")
    parser.add_argument("--color", "-c", default="#4f46e5", help="Cor principal (hex, padrão: #4f46e5)")
    parser.add_argument("--bg", "-b", default="#ffffff", help="Cor de fundo (hex, padrão: #ffffff)")
    parser.add_argument("--size", "-s", type=int, default=20, help="Tamanho dos blocos (padrão: 20)")
    parser.add_argument("--shorten", choices=["tinyurl", "isgd", "dagd"], help="Encurtar URL antes de gerar")

    args = parser.parse_args()

    target_url = args.url
    if args.shorten:
        target_url = shorten_url(target_url, args.shorten)
        print(f"[+] URL encurtada: {target_url}")

    generate_qr(target_url, args.output, args.color, args.bg, args.size)

if __name__ == "__main__":
    main()
