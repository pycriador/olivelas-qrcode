# Olivelas QR Code Studio (TypeScript 2.0) 🚀

Uma plataforma intuitiva, ultra-rápida e profissional desenvolvida em **TypeScript** com **criação dinâmica de HTML**, **54+ estilos**, **11 encurtadores de URL integrados**, **logotipos oficiais do Wikimedia Commons**, **painel lateral minimizável** e suporte completo para geração e download via **cURL** e **Python**.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite)
![Estilos](https://img.shields.io/badge/Estilos%20e%20Presets-54%2B-indigo)
![Encurtadores](https://img.shields.io/badge/Encurtadores%20de%20URL-11%20Servi%C3%A7os-success)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages%20Ready-brightgreen)

---

## 🌟 O que há de novo na Versão 2.0 (TypeScript)

1. **Arquitetura 100% TypeScript com DOM Dinâmico**:
   - Todo o HTML é construído modularmente e tipado dinamicamente via TypeScript (`src/components/`).
   - Zero dependência de frameworks pesados no bundle final (alta performance e leveza).

2. **11 Encurtadores de URL Nativos Integrados**:
   - Encurte qualquer link com 1 clique antes de gerar o QR Code (links mais curtos geram códigos mais limpos e muito mais fáceis de escanear por smartphones):
     1. **TinyURL** (`tinyurl.com`)
     2. **is.gd** (`is.gd`)
     3. **v.gd** (`v.gd`)
     4. **Ulvis.net** (`ulvis.net`)
     5. **da.gd** (`da.gd`)
     6. **CleanURI** (`cleanuri.com`)
     7. **1pt.co** (`1pt.co`)
     8. **Clck.ru** (`clck.ru`)
     9. **Chilp.it** (`chilp.it`)
     10. **Spoo.me** (`spoo.me`)
     11. **GoTiny** (`gotiny.cc`)
   - Inclui cópia automática do link encurtado para o clipboard e proxy de fallback para contornar bloqueios de CORS em navegadores.

3. **Logotipos Oficiais Reais do Wikimedia Commons / Wikipedia**:
   - Nada de ícones deformados ou imagens feias geradas por IA: usamos exclusivamente **vetores SVG oficiais** do repositório público do **Wikimedia Commons**.
   - Cada marca inclui o link de atribuição e fonte canônica:
     - **WhatsApp**: [File:WhatsApp.svg](https://commons.wikimedia.org/wiki/File:WhatsApp.svg)
     - **Instagram**: [File:Instagram_logo_2016.svg](https://commons.wikimedia.org/wiki/File:Instagram_logo_2016.svg)
     - **Pix (Banco Central)**: [File:Pix_logo.svg](https://commons.wikimedia.org/wiki/File:Pix_logo.svg)
     - **YouTube**: [File:YouTube_full-color_icon_(2017).svg](https://commons.wikimedia.org/wiki/File:YouTube_full-color_icon_(2017).svg)
     - **LinkedIn**: [File:LinkedIn_icon.svg](https://commons.wikimedia.org/wiki/File:LinkedIn_icon.svg)
     - **Spotify**: [File:Spotify_logo_without_text.svg](https://commons.wikimedia.org/wiki/File:Spotify_logo_without_text.svg)
     - **GitHub**: [File:Octicons-mark-github.svg](https://commons.wikimedia.org/wiki/File:Octicons-mark-github.svg)
     - **X / Twitter**: [File:X_logo_2023_original.svg](https://commons.wikimedia.org/wiki/File:X_logo_2023_original.svg)
     - **TikTok**: [File:TikTok_logo.svg](https://commons.wikimedia.org/wiki/File:TikTok_logo.svg)
     - **Telegram**: [File:Telegram_logo.svg](https://commons.wikimedia.org/wiki/File:Telegram_logo.svg)
     - **Facebook**: [File:Facebook_Logo_(2019).png.svg](https://commons.wikimedia.org/wiki/File:Facebook_Logo_(2019).png.svg)
     - **Google**: [File:Google_%22G%22_logo.svg](https://commons.wikimedia.org/wiki/File:Google_%22G%22_logo.svg)
     - **Wi-Fi**: [File:Wifi_symbol.svg](https://commons.wikimedia.org/wiki/File:Wifi_symbol.svg)
     - **Mercado Pago**: [File:MercadoPago_logo.svg](https://commons.wikimedia.org/wiki/File:MercadoPago_logo.svg)

4. **Pré-Visualização Flutuante e Minimizável na Lateral**:
   - A pré-visualização fica **sempre visível (sticky)** na lateral direita em monitores desktop.
   - Botão **"Minimizar"**: quando acionado, o painel se retrai suavemente para uma barra/pill flutuante na lateral, liberando 100% da tela para os controles.
   - Um simples toque na aba flutuante restaura a pré-visualização instantaneamente.

5. **Aba Exclusiva de Documentação para Terminal (cURL & Python)**:
   - Uma seção completa dentro do próprio app com exemplos prontos para copiar e executar.
   - Scripts prontos para download:
     - `scripts/generate_qr.py`: Script CLI em Python completo.
     - `scripts/curl_examples.sh`: Exemplos de cURL com pipelines para terminal.

---

## 💻 Como Iniciar o Projeto Localmente

### 🪟 No Windows:
- Dê dois cliques em **`start.bat`**, ou
- Pelo PowerShell:
  ```powershell
  .\start.ps1
  ```

### 🐧 No Linux ou 🍎 No macOS:
Execute no terminal:
```bash
./start.sh
```

*(O script detecta se você possui Node/npm para rodar `npm run dev` com live reload na porta 3000, ou Python para servir a pasta `dist` na porta 8000).*

---

## ⚡ Comandos Rápidos cURL

### 1. Download de QR Code PNG em Alta Definição:
```bash
curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode" -o qrcode.png
```

### 2. Download em Vetor SVG com Cores Customizadas:
```bash
curl -s "https://quickchart.io/qr?text=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode&dark=4f46e5&light=ffffff&size=1024&format=svg" -o qrcode.svg
```

### 3. Pipeline cURL: Encurtar URL e Gerar QR Code Automático:
```bash
SHORT_URL=$(curl -s "https://tinyurl.com/api-create.php?url=https://github.com/pycriador/olivelas-qrcode")
echo "Encurtado: $SHORT_URL"
curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=$(echo $SHORT_URL | sed 's/:/%3A/g;s/\//%2F/g')" -o qrcode_curto.png
```

---

## 🐍 Como Usar o Script Python (`scripts/generate_qr.py`)

Instale as dependências recomendadas:
```bash
pip install qrcode[pil] requests
```

Exemplos de execução:
```bash
# 1. Gerar padrão em alta resolução:
python scripts/generate_qr.py --url "https://github.com/pycriador/olivelas-qrcode"

# 2. Gerar com cor personalizada e tamanho customizado:
python scripts/generate_qr.py --url "https://meusite.com" --color "#4f46e5" --output meu_qr.png

# 3. Encurtar a URL automaticamente antes de gerar:
python scripts/generate_qr.py --url "https://meusite.com/link-longo" --shorten tinyurl --output qr_curto.png
```

---

## 🌐 Publicação no GitHub Pages

O projeto já inclui o workflow automático do **GitHub Actions** em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) e a pasta de contingência [`docs/`](docs/).

Para ativar no GitHub:
1. Acesse: [https://github.com/pycriador/olivelas-qrcode/settings/pages](https://github.com/pycriador/olivelas-qrcode/settings/pages)
2. Em **Source**:
   - **Opção Recomendada**: Escolha **`GitHub Actions`** (ele compilará e publicará a versão TypeScript automaticamente a cada push).
   - **Opção Alternativa**: Escolha `Deploy from a branch` -> `main` / `/docs` -> `Save`.
3. Em 1 minuto seu site estará no ar em:
   👉 **`https://pycriador.github.io/olivelas-qrcode/`**

---

## 📁 Estrutura do Repositório

```
olivelas-qrcode/
├── index.html                   # Shell da aplicação HTML
├── vite.config.ts               # Configuração do Vite (base: './')
├── tsconfig.json                # Configuração do TypeScript
├── package.json                 # Dependências e scripts npm
├── start.bat                    # Inicializador Windows Batch
├── start.ps1                    # Inicializador Windows PowerShell
├── start.sh                     # Inicializador Linux/macOS
├── .nojekyll                    # Instrução para GitHub Pages
├── .github/workflows/deploy.yml # Pipeline de CI/CD do GitHub Actions
├── scripts/
│   ├── generate_qr.py           # Script CLI Python
│   └── curl_examples.sh         # Exemplos cURL
├── docs/                        # Build estático pré-compilado para GitHub Pages
├── dist/                        # Build de produção do Vite
└── src/
    ├── main.ts                  # Ponto de entrada da aplicação
    ├── types.ts                 # Interfaces e tipagens estritas
    ├── style.css                # CSS responsivo e sistema de espaçamentos
    ├── services/
    │   ├── shorteners.ts        # 11 encurtadores de URL com fallbacks CORS
    │   ├── wikipediaLogos.ts    # Vetores oficiais do Wikimedia Commons
    │   ├── presets.ts           # 54 presets em 6 categorias
    │   └── qrEngine.ts          # Motor de geração, canvas composto e downloads
    └── components/
        ├── Header.ts            # Cabeçalho e navegação de rotas
        ├── ContentPanel.ts      # Formulários e barra de encurtadores
        ├── PresetGallery.ts     # Galeria com busca e filtros
        ├── CustomizerPanel.ts   # Customização granular e formatos
        ├── IconSelector.ts      # Seletor de logos com links da Wikipedia
        ├── PreviewSidebar.ts    # Sidebar sticky minimizável na lateral
        └── DocsView.ts          # Página completa de documentação cURL e Python
```

---

Desenvolvido com foco em código limpo, modularidade e máxima facilidade de uso.
