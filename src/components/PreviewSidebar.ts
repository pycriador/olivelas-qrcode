import { QRState, ExportFormat } from '../types';
import { QREngine } from '../services/qrEngine';

export function renderPreviewSidebar(
  state: QRState,
  qrEngine: QREngine,
  onToggleCollapse: () => void,
  onShowToast: (msg: string) => void
): HTMLElement {
  const container = document.createElement('aside');
  container.className = `preview-column ${state.isSidebarCollapsed ? 'collapsed' : ''}`;

  container.innerHTML = `
    <!-- Dock Flutuante na Lateral quando minimizado/oculto -->
    <div class="docked-preview-pill ${state.isSidebarCollapsed ? '' : 'hidden'}" id="btn-expand-dock" title="Clique para reabrir a pré-visualização fixa">
      <div class="docked-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="8" height="8" x="2" y="2" rx="2"/><rect width="8" height="8" x="14" y="2" rx="2"/><rect width="8" height="8" x="2" y="14" rx="2"/><rect width="4" height="4" x="15" y="15" rx="1"/></svg>
      </div>
      <span class="docked-text">Abrir QR Code</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </div>

    <!-- Painel Principal de Preview FIXO na Lateral -->
    <div class="preview-sticky-card ${state.isSidebarCollapsed ? 'hidden' : ''}">
      
      <!-- Cabeçalho do Preview com Botão de Ocultar -->
      <div class="preview-card-header">
        <div style="display: flex; flex-direction: column; gap: 0.2rem;">
          <span class="preview-header-title">QR Code em Tempo Real</span>
          <span id="badge-contrast-check" class="contrast-badge ok">✓ Legibilidade Ótima</span>
        </div>

        <!-- Botão Ocultar Painel -->
        <button type="button" id="btn-collapse-sidebar" class="btn-hide-preview-sidebar" title="Ocultar painel para liberar espaço na tela">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          <span>Ocultar</span>
        </button>
      </div>

      <!-- Moldura Composta em Tempo Real -->
      <div id="preview-frame-wrap" class="preview-frame-wrapper" style="background: ${state.frameStyle === 'bottom' ? state.frameBgColor : '#ffffff'}; border: ${state.frameStyle === 'card' ? `3px solid ${state.dotsColor}` : 'none'};">
        <div id="preview-badge-top" class="preview-frame-badge-top ${state.frameStyle === 'top' ? '' : 'hidden'}" style="background: ${state.frameBgColor}; color: ${state.frameTextColor};">
          ${state.frameText || 'SCAN HERE'}
        </div>

        <div id="qr-canvas-holder" class="preview-canvas-container">
          <!-- Canvas é montado pelo qrEngine -->
        </div>

        <div id="preview-text-bottom" class="preview-frame-text-bottom ${state.frameStyle === 'bottom' || state.frameStyle === 'card' ? '' : 'hidden'}" style="color: ${state.frameStyle === 'bottom' ? state.frameTextColor : state.dotsColor};">
          ${state.frameText || 'ESCANEIE-ME'}
        </div>
      </div>

      <!-- Metadados de Destino e Resolução -->
      <div class="qr-meta-status">
        <div class="meta-row">
          <span>Destino:</span>
          <span id="preview-data-url-label" class="meta-pill" title="${state.data}">${state.data}</span>
        </div>
        <div class="meta-row">
          <span>Resolução:</span>
          <span>${state.exportSize} x ${state.exportSize} px</span>
        </div>
      </div>

      <!-- Botões de Ação e Download -->
      <div class="download-actions-grid">
        <button type="button" id="btn-dl-png" class="btn-primary-download">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Baixar Imagem (PNG)
        </button>

        <button type="button" id="btn-dl-svg" class="btn-secondary-action" title="Download vetorial para Illustrator, Figma e impressão gráfica">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Vetor (SVG)
        </button>

        <button type="button" id="btn-dl-webp" class="btn-secondary-action" title="Download em formato WebP otimizado">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          WebP
        </button>

        <button type="button" id="btn-copy-clip" class="btn-secondary-action" title="Copiar imagem direto para colar no WhatsApp, Figma ou slides">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copiar Imagem
        </button>

        <button type="button" id="btn-print" class="btn-secondary-action" title="Imprimir diretamente">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          Imprimir
        </button>

        <button type="button" id="btn-test-link" class="btn-secondary-action" style="grid-column: span 2;" title="Testar se o link abre no navegador">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Testar Link no Navegador
        </button>
      </div>

      <!-- Recentes -->
      <div style="width: 100%; margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Códigos Recentes</span>
          <span style="font-size: 0.7rem; color: var(--text-muted);">Sessão local</span>
        </div>
        <div id="history-items-list"></div>
      </div>

    </div>
  `;

  // Handlers de Ocultar / Mostrar
  container.querySelector('#btn-collapse-sidebar')?.addEventListener('click', onToggleCollapse);
  container.querySelector('#btn-expand-dock')?.addEventListener('click', onToggleCollapse);

  // Downloads e Ações
  container.querySelector('#btn-dl-png')?.addEventListener('click', () => {
    qrEngine.download(state, 'png');
    onShowToast('Baixando imagem PNG em alta resolução...');
  });

  container.querySelector('#btn-dl-svg')?.addEventListener('click', () => {
    qrEngine.download(state, 'svg');
    onShowToast('Baixando vetor SVG escalável...');
  });

  container.querySelector('#btn-dl-webp')?.addEventListener('click', () => {
    qrEngine.download(state, 'webp');
    onShowToast('Baixando formato WebP...');
  });

  container.querySelector('#btn-copy-clip')?.addEventListener('click', async () => {
    const success = await qrEngine.copyToClipboard(state);
    if (success) {
      onShowToast('QR Code copiado para a área de transferência! (Pode colar no WhatsApp, Figma, etc)');
    } else {
      onShowToast('Não foi possível copiar automaticamente no navegador');
    }
  });

  container.querySelector('#btn-print')?.addEventListener('click', () => {
    qrEngine.print(state);
  });

  container.querySelector('#btn-test-link')?.addEventListener('click', () => {
    if (state.data.startsWith('http')) {
      window.open(state.data, '_blank', 'noopener,noreferrer');
    } else {
      onShowToast('O conteúdo atual não é um link direto');
    }
  });

  // Atualizar Histórico na UI
  const historyList = container.querySelector('#history-items-list') as HTMLElement;
  const renderHistory = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('olivelas_qr_history') || '[]');
      if (stored.length === 0) {
        historyList.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-muted);">Nenhum código gerado ainda.</span>';
        return;
      }
      historyList.innerHTML = stored.map((item: any) => `
        <div class="history-chip" data-hist="${encodeURIComponent(item.data)}">
          <span class="history-chip-url">${item.data}</span>
          <span class="history-chip-time">${item.date}</span>
        </div>
      `).join('');

      historyList.querySelectorAll('.history-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const raw = decodeURIComponent(chip.getAttribute('data-hist') || '');
          const urlInput = document.querySelector('#input-main-url') as HTMLInputElement;
          if (urlInput) {
            urlInput.value = raw;
            urlInput.dispatchEvent(new Event('input'));
            onShowToast('Código recente carregado!');
          }
        });
      });
    } catch {
      historyList.innerHTML = '';
    }
  };

  setTimeout(renderHistory, 0);

  return container;
}
