import { QRState } from '../types';
import { WIKIPEDIA_LOGOS } from '../services/wikipediaLogos';

export function renderIconSelector(
  state: QRState,
  onUpdateState: (partial: Partial<QRState>) => void,
  onShowToast: (msg: string) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'custom-section';

  container.innerHTML = `
    <div class="section-label">
      <span>Logotipo Central Oficial (Wikipedia / Wikimedia Commons)</span>
      <span class="badge-tag-count">Vetores Oficiais</span>
    </div>
    <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
      Ícones oficiais com traços autênticos extraídos diretamente do acervo de arquivos públicos do Wikimedia Commons.
    </p>

    <!-- Upload de Logo Próprio -->
    <div id="box-upload-logo" class="upload-logo-box">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <span>Clique para enviar seu próprio logotipo (PNG, JPG, SVG)</span>
      <input type="file" id="input-file-custom-logo" accept="image/*" class="hidden">
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem;">
      <span id="label-custom-logo-name" style="font-size: 0.8rem; font-weight: 600; color: var(--brand-primary);">${state.customLogoFileName || ''}</span>
      <button type="button" id="btn-clear-logo" style="background: none; border: none; font-size: 0.75rem; color: var(--brand-danger); cursor: pointer; text-decoration: underline;">Remover Logo</button>
    </div>

    <!-- Grade de Ícones Oficiais da Wikipedia -->
    <div style="margin-top: 1rem;">
      <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">
        Ou selecione uma marca oficial:
      </span>
      <div class="wiki-logos-grid">
        ${WIKIPEDIA_LOGOS.map(logo => `
          <div class="wiki-logo-card ${state.logoType === 'wikipedia' && state.selectedWikipediaLogoId === logo.id ? 'active' : ''}" data-wiki-id="${logo.id}">
            <div class="wiki-logo-icon-wrap" style="color: ${logo.brandColor};">
              ${logo.svg}
            </div>
            <span class="wiki-logo-name">${logo.name}</span>
            <a href="${logo.wikipediaUrl}" target="_blank" rel="noopener noreferrer" class="wiki-source-link" title="Ver arquivo original no Wikimedia Commons">
              Wikimedia
            </a>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Sliders de Ajuste -->
    <div class="slider-group" style="margin-top: 1.25rem;">
      <div class="slider-header">
        <span>Tamanho do Logotipo</span>
        <span id="val-logo-size-indicator">${Math.round(state.logoSize * 100)}%</span>
      </div>
      <input type="range" id="slider-logo-size-control" class="slider-input" min="0.15" max="0.45" step="0.05" value="${state.logoSize}">
    </div>
  `;

  // Upload Customizado
  const fileInput = container.querySelector('#input-file-custom-logo') as HTMLInputElement;
  container.querySelector('#box-upload-logo')?.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        container.querySelectorAll('.wiki-logo-card').forEach(c => c.classList.remove('active'));
        (container.querySelector('#label-custom-logo-name') as HTMLElement).textContent = `Arquivo: ${file.name}`;
        onUpdateState({
          logoType: 'custom',
          customLogoDataUrl: result,
          customLogoFileName: file.name,
          selectedWikipediaLogoId: null
        });
        onShowToast('Logotipo carregado com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  });

  // Limpar Logo
  container.querySelector('#btn-clear-logo')?.addEventListener('click', () => {
    container.querySelectorAll('.wiki-logo-card').forEach(c => c.classList.remove('active'));
    (container.querySelector('#label-custom-logo-name') as HTMLElement).textContent = '';
    onUpdateState({
      logoType: 'none',
      selectedWikipediaLogoId: null,
      customLogoDataUrl: null,
      customLogoFileName: null
    });
    onShowToast('Logotipo removido');
  });

  // Selecionar Logo da Wikipedia
  container.querySelectorAll('.wiki-logo-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Se clicou no link de fonte, deixa abrir o Wikimedia
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return;

      const id = card.getAttribute('data-wiki-id');
      if (state.logoType === 'wikipedia' && state.selectedWikipediaLogoId === id) {
        card.classList.remove('active');
        onUpdateState({ logoType: 'none', selectedWikipediaLogoId: null });
      } else {
        container.querySelectorAll('.wiki-logo-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        (container.querySelector('#label-custom-logo-name') as HTMLElement).textContent = '';
        onUpdateState({
          logoType: 'wikipedia',
          selectedWikipediaLogoId: id,
          customLogoDataUrl: null,
          customLogoFileName: null
        });
        onShowToast('Logotipo oficial do Wikimedia aplicado!');
      }
    });
  });

  // Slider de Tamanho
  container.querySelector('#slider-logo-size-control')?.addEventListener('input', (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    (container.querySelector('#val-logo-size-indicator') as HTMLElement).textContent = `${Math.round(val * 100)}%`;
    onUpdateState({ logoSize: val });
  });

  return container;
}
