# Olivelas QR Code Studio 🚀

Uma plataforma intuitiva, rápida e profissional para criação e personalização de códigos QR Code de alta resolução, pronta para hospedagem no **GitHub Pages**.

![Status](https://img.shields.io/badge/Status-Pronto-success)
![Estilos](https://img.shields.io/badge/Personaliza%C3%A7%C3%B5es-54%2B-blue)
![Frontend](https://img.shields.io/badge/Frontend-100%25%20Client--Side-informational)
![Licença](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Principais Funcionalidades

1. **Geração Instantânea em Tempo Real**:
   - Basta colar qualquer URL ou texto e o QR Code é gerado na hora.
   - Botão rápido **"Colar Link"** com leitura da área de transferência em 1 clique.
   - Botão **"Testar se o Link Funciona"** para validação imediata.

2. **Mais de 50 Estilos e Combinações Prontas (54 Presets Exclusivos)**:
   - 🌟 **Tendências & Populares** (Índigo Profundo, Esmeralda Tech, Brisa Oceânica, Pôr do Sol, etc.)
   - 💼 **Corporativo & Negócios** (Azul Executivo, Titânio Fosco, Dourado Alta Classe, Vinho Nobre, etc.)
   - 🎨 **Gradientes Vibrantes & Criativos** (Aurora Cósmica, Brasa Ardente, Lima Tropical, Neon Punch, etc.)
   - 📱 **Redes Sociais & Marcas** (WhatsApp, Instagram, Pix, LinkedIn, YouTube, Spotify, TikTok, GitHub, X)
   - 🌑 **Dark & AMOLED Cyberpunk** (AMOLED Puro, Terminal Matrix, Synthwave Retrô, Obsidiana & Ouro, etc.)
   - 🌸 **Tons Pastel & Delicados** (Lavanda Suave, Rosa Delicado, Matcha Green, Névoa Nórdica, etc.)

3. **Personalização Granular Total**:
   - **Formato dos Pontos (6 estilos)**: Quadrado, Arredondado, Pontos (Dots), Elegante (Classy), Curvo Suave, Ultra Curvo.
   - **Formato dos Cantos**: Quadrado, Extra Arredondado e Circular.
   - **Cores & Gradientes**: Cor sólida, Gradiente Linear com seletor de ângulo de 0° a 360°, cores de fundo sólidas ou transparentes.
   - **Logotipos Centrais**: Upload do seu próprio logo (PNG/JPG/SVG) ou escolha entre 14 ícones oficiais embutidos com ajuste de tamanho e margem.
   - **Molduras & Textos (Call to Action)**: "ESCANEIE-ME", Badge superior, Card com borda ou sem moldura.
   - **Verificação de Contraste Automática**: Alerta inteligente para garantir leitura rápida por câmeras de smartphones.

4. **Exportação & Compartilhamento**:
   - 📥 **PNG em Alta Resolução (1024x1024px)**
   - 📐 **SVG Vetorial** (Ideal para gráficas, impressão e edição no Adobe Illustrator / Figma / CorelDraw)
   - 🖼️ **WEBP** (Otimizado para web)
   - 📋 **Copiar Imagem**: copia o QR code direto para colar no WhatsApp, Slack, Figma ou documentos
   - 🖨️ **Imprimir**: visualização pronta para impressão direta
   - 🕒 **Histórico Recente**: salva automaticamente os últimos códigos gerados no navegador

5. **Suporte a Vários Tipos de Conteúdo**:
   - 🔗 URL / Links de Sites
   - 💬 Conversa do WhatsApp com número e mensagem pré-preenchida
   - 💳 Chave Pix com dados de cobrança
   - 📶 Conexão Wi-Fi automática (SSID e senha)
   - 📇 Contato VCard completo
   - 📝 Texto Livre

---

## 🌐 Como Publicar no GitHub Pages (Passo a Passo)

Como o projeto é **100% frontend estático**, ele pode ser publicado no GitHub Pages em menos de 1 minuto:

1. Faça o commit e push dos arquivos para o seu repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: plataforma olivelas qrcode com 54+ personalizacoes"
   git push origin main
   ```

2. Abra o repositório no GitHub: [https://github.com/pycriador/olivelas-qrcode](https://github.com/pycriador/olivelas-qrcode)
3. Vá em **Settings** (Configurações) no menu superior do repositório.
4. No menu lateral esquerdo, clique em **Pages**.
5. Na seção **Build and deployment**:
   - **Source**: Selecione `Deploy from a branch`
   - **Branch**: Selecione `main` e a pasta `/(root)`
   - Clique em **Save**.
6. Aguarde cerca de 1 a 2 minutos. Seu site estará no ar no endereço:
   👉 **`https://pycriador.github.io/olivelas-qrcode/`**

---

## 💻 Como Iniciar o Projeto (Scripts para Windows, Linux e Mac)

Foram incluídos scripts de inicialização automática com detecção de ambiente para **Windows**, **Linux** e **Mac**:

### 🪟 No Windows:
- Dê dois cliques no arquivo **`start.bat`**, ou
- Pelo PowerShell:
  ```powershell
  .\start.ps1
  ```

### 🐧 No Linux ou 🍎 No macOS:
Execute no terminal:
```bash
./start.sh
```

*(O script detecta automaticamente se você tem Python ou Node instalado para rodar um servidor local com live reload na porta 8000/3000 e abre seu navegador automaticamente. Se não tiver nenhum dos dois, ele abre o `index.html` diretamente).*

---

## 📁 Estrutura de Arquivos

```
olivelas-qrcode/
├── index.html                   # Estrutura HTML semântica e acessível
├── README.md                    # Documentação do projeto
├── .gitignore                   # Exclusão de arquivos temporários
├── .nojekyll                    # Instrução para o GitHub Pages
└── assets/
    ├── css/
    │   └── style.css            # Estilos modernos, Dark/Light mode, responsividade
    └── js/
        ├── vendor/
        │   └── qr-code-styling.js # Biblioteca independente (sem depender de CDNs)
        ├── presets.js           # Catálogo com 54 presets divididos em 6 categorias
        ├── icons.js             # Ícones SVG de marcas e logotipos centrais
        └── app.js               # Lógica interativa, geração, cópia e downloads
```

---

Desenvolvido para máxima praticidade, performance e liberdade de criação.
