export function renderDocsView(onBackToApp: () => void, onShowToast: (msg: string) => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'docs-container';

  container.innerHTML = `
    <!-- Topo da Documentação -->
    <div class="docs-header-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <button id="btn-docs-back" class="btn-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Voltar ao Criador Interativo
          </button>
          <h1 class="docs-main-title">📚 Documentação cURL & Scripts Python</h1>
          <p class="docs-subtitle">
            Aprenda a gerar e baixar códigos QR Code diretamente do seu terminal com cURL ou scripts Python automatizados.
          </p>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <a href="scripts/generate_qr.py" download="generate_qr.py" class="btn-doc-download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Baixar Script Python (.py)
          </a>
          <a href="scripts/curl_examples.sh" download="curl_examples.sh" class="btn-doc-download outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Baixar Exemplos cURL (.sh)
          </a>
        </div>
      </div>
    </div>

    <!-- SEÇÃO 1: COMANDOS cURL -->
    <div class="panel-card docs-section-card">
      <div class="docs-section-heading">
        <div class="step-badge">1</div>
        <div>
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">Gerando QR Codes via cURL</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Comandos prontos para rodar no terminal Linux, macOS ou PowerShell no Windows.</p>
        </div>
      </div>

      <!-- Exemplo 1.1 -->
      <div class="code-example-block">
        <div class="code-header">
          <span class="code-title">Exemplo 1: Download de QR Code PNG em Alta Resolução</span>
          <button class="btn-copy-code" data-target="code-curl-1">Copiar Comando</button>
        </div>
        <pre><code id="code-curl-1">curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode" -o qrcode.png</code></pre>
      </div>

      <!-- Exemplo 1.2 -->
      <div class="code-example-block">
        <div class="code-header">
          <span class="code-title">Exemplo 2: Download em Formato Vetorial SVG (Cores Customizadas)</span>
          <button class="btn-copy-code" data-target="code-curl-2">Copiar Comando</button>
        </div>
        <pre><code id="code-curl-2"># Gera um SVG com cor #4f46e5 (Índigo) e fundo transparente
curl -s "https://quickchart.io/qr?text=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode&dark=4f46e5&light=ffffff00&size=1024&format=svg" -o qrcode.svg</code></pre>
      </div>

      <!-- Exemplo 1.3 -->
      <div class="code-example-block">
        <div class="code-header">
          <span class="code-title">Exemplo 3: Encurtar URL no Terminal e Gerar QR Code em um Único Pipeline</span>
          <button class="btn-copy-code" data-target="code-curl-3">Copiar Comando</button>
        </div>
        <pre><code id="code-curl-3"># Encurta com TinyURL e faz o download direto do QR Code do link encurtado
SHORT_URL=$(curl -s "https://tinyurl.com/api-create.php?url=https://github.com/pycriador/olivelas-qrcode")
echo "Link Encurtado: $SHORT_URL"
curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=$(echo $SHORT_URL | sed 's/:/%3A/g;s/\//%2F/g')" -o qrcode_encurtado.png</code></pre>
      </div>
    </div>

    <!-- SEÇÃO 2: SCRIPT PYTHON OFICIAL -->
    <div class="panel-card docs-section-card">
      <div class="docs-section-heading">
        <div class="step-badge">2</div>
        <div>
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">Script Python Automatizado (CLI)</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Script completo com suporte a cores personalizadas, encurtador de URL automático e alta resolução.</p>
        </div>
      </div>

      <div style="background: var(--bg-surface-secondary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
        <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem;">Instalação de Dependências:</h3>
        <pre><code style="font-family: monospace; font-size: 0.85rem;">pip install qrcode[pil] requests</code></pre>
      </div>

      <div class="code-example-block">
        <div class="code-header">
          <span class="code-title">Como executar o script incluído no repositório (scripts/generate_qr.py):</span>
          <button class="btn-copy-code" data-target="code-py-cli">Copiar Exemplo</button>
        </div>
        <pre><code id="code-py-cli"># 1. Gerar QR Code padrão
python scripts/generate_qr.py --url "https://github.com/pycriador/olivelas-qrcode"

# 2. Gerar com cor customizada (#4f46e5) e resolução 1024px
python scripts/generate_qr.py --url "https://meusite.com" --color "#4f46e5" --size 1024 --output meu_qrcode.png

# 3. Encurtar automaticamente a URL antes de gerar o código
python scripts/generate_qr.py --url "https://meusite.com/artigo-longo-com-parametros" --shorten tinyurl --output qr_curto.png</code></pre>
      </div>

      <div class="code-example-block">
        <div class="code-header">
          <span class="code-title">Código Python Independente (Pronto para Copiar):</span>
          <button class="btn-copy-code" data-target="code-py-full">Copiar Código Python</button>
        </div>
        <pre><code id="code-py-full">import qrcode
import requests
from PIL import Image

def generate_qr(url: str, output_path: str = "qrcode.png", fill_color: str = "#4f46e5", back_color: str = "#ffffff"):
    """Gera um QR Code em alta definição e salva no disco."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20, # Alta definição
        border=3,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color=fill_color, back_color=back_color)
    img.save(output_path)
    print(f"[OK] QR Code salvo com sucesso em: {output_path}")

if __name__ == "__main__":
    generate_qr("https://github.com/pycriador/olivelas-qrcode", "olivelas_qr.png")</code></pre>
      </div>
    </div>

    <!-- SEÇÃO 3: PARÂMETROS E TABELA DE REFERÊNCIA -->
    <div class="panel-card docs-section-card">
      <div class="docs-section-heading">
        <div class="step-badge">3</div>
        <div>
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">Tabela de Parâmetros da API</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Valores suportados para customizações rápidas via cURL.</p>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Parâmetro</th>
              <th>Tipo</th>
              <th>Padrão</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>data</code> / <code>text</code></td>
              <td>String (URL-encoded)</td>
              <td>Obrigatório</td>
              <td>O conteúdo ou link que o QR Code irá abrir ao ser escaneado.</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>Inteiro (px)</td>
              <td><code>1024</code></td>
              <td>Dimensões quadradas da imagem final (ex: 512, 1024, 2048).</td>
            </tr>
            <tr>
              <td><code>format</code></td>
              <td><code>png</code> | <code>svg</code> | <code>webp</code></td>
              <td><code>png</code></td>
              <td>Formato do arquivo resultante. Use <code>svg</code> para impressão gráfica.</td>
            </tr>
            <tr>
              <td><code>dark</code> / <code>color</code></td>
              <td>Hexadecimal</td>
              <td><code>#0f172a</code></td>
              <td>Cor dos pontos e marcadores do código (ex: <code>4f46e5</code>).</td>
            </tr>
            <tr>
              <td><code>light</code> / <code>bg</code></td>
              <td>Hexadecimal</td>
              <td><code>#ffffff</code></td>
              <td>Cor do plano de fundo. Adicione <code>00</code> no final para transparência em SVG.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Eventos
  container.querySelector('#btn-docs-back')?.addEventListener('click', onBackToApp);

  container.querySelectorAll('.btn-copy-code').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const codeEl = container.querySelector(`#${targetId}`);
      if (codeEl) {
        await navigator.clipboard.writeText(codeEl.textContent || '');
        btn.textContent = 'Copiado!';
        onShowToast('Código copiado para a área de transferência!');
        setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
      }
    });
  });

  return container;
}
