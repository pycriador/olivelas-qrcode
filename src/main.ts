import './style.css';
import { QRState } from './types';
import { QREngine } from './services/qrEngine';
import { renderHeader } from './components/Header';
import { renderContentPanel } from './components/ContentPanel';
import { renderCustomizerPanel } from './components/CustomizerPanel';
import { renderPreviewSidebar } from './components/PreviewSidebar';
import { renderDocsView } from './components/DocsView';

class OlivelasApp {
  private state: QRState = {
    contentType: 'url',
    data: 'https://github.com/pycriador/olivelas-qrcode',
    rawUrl: 'https://github.com/pycriador/olivelas-qrcode',

    dotsType: 'rounded',
    dotsColor: '#4f46e5',
    dotsGradientEnabled: true,
    dotsGradientType: 'linear',
    dotsGradientRotation: 45,
    dotsColor2: '#7c3aed',

    cornersSquareType: 'extra-rounded',
    cornersSquareColor: '#4338ca',
    cornersDotType: 'dot',
    cornersDotColor: '#4338ca',
    cornersSync: true,

    bgColor: '#ffffff',
    bgTransparent: false,

    logoType: 'none',
    selectedWikipediaLogoId: null,
    customLogoDataUrl: null,
    customLogoFileName: null,
    logoSize: 0.35,
    logoMargin: 6,

    frameStyle: 'none',
    frameText: 'ESCANEIE-ME',
    frameBgColor: '#4f46e5',
    frameTextColor: '#ffffff',

    exportSize: 1024,
    errorCorrectionLevel: 'Q',
    margin: 10,

    activePresetId: 'midnight-indigo',
    isSidebarCollapsed: false,
    activeView: 'app'
  };

  private qrEngine = new QREngine();
  private updateTimer: any = null;
  private appRoot: HTMLElement;

  constructor() {
    const root = document.getElementById('app');
    if (!root) throw new Error('Elemento #app não encontrado no DOM');
    this.appRoot = root;

    this.initTheme();
    this.render();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('olivelas_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  private toggleTheme = (): void => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('olivelas_theme', current);
  };

  private switchView = (view: 'app' | 'docs'): void => {
    this.state.activeView = view;
    this.render();
    if (view === 'app') {
      this.initQRCanvas();
    }
  };

  private updateState = (partial: Partial<QRState>): void => {
    Object.assign(this.state, partial);
    this.scheduleQRUpdate();
    this.updatePreviewVisuals();
  };

  private scheduleQRUpdate(): void {
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(() => {
      this.qrEngine.update(this.state);
      this.saveHistory();
    }, 120);
  }

  private updatePreviewVisuals(): void {
    const frameWrap = document.getElementById('preview-frame-wrap');
    const badgeTop = document.getElementById('preview-badge-top');
    const textBottom = document.getElementById('preview-text-bottom');
    const urlLabel = document.getElementById('preview-data-url-label');
    const contrastBadge = document.getElementById('badge-contrast-check');

    if (urlLabel) {
      urlLabel.textContent = this.state.data.length > 32 
        ? this.state.data.substring(0, 30) + '...' 
        : this.state.data;
    }

    if (frameWrap && badgeTop && textBottom) {
      badgeTop.classList.add('hidden');
      textBottom.classList.add('hidden');
      frameWrap.style.background = '#ffffff';
      frameWrap.style.border = 'none';

      if (this.state.frameStyle === 'bottom') {
        textBottom.classList.remove('hidden');
        textBottom.textContent = this.state.frameText || 'ESCANEIE-ME';
        textBottom.style.color = this.state.frameTextColor;
        frameWrap.style.background = this.state.frameBgColor;
      } else if (this.state.frameStyle === 'top') {
        badgeTop.classList.remove('hidden');
        badgeTop.textContent = this.state.frameText || 'SCAN HERE';
        badgeTop.style.background = this.state.frameBgColor;
        badgeTop.style.color = this.state.frameTextColor;
      } else if (this.state.frameStyle === 'card') {
        textBottom.classList.remove('hidden');
        textBottom.textContent = this.state.frameText || 'APONTE A CÂMERA';
        textBottom.style.color = this.state.dotsColor;
        frameWrap.style.border = `3px solid ${this.state.dotsColor}`;
      }
    }

    // Contraste
    if (contrastBadge) {
      const isLightDot = this.isTooLight(this.state.dotsColor);
      const isWhiteBg = this.state.bgColor.toLowerCase() === '#ffffff';
      if (isWhiteBg && isLightDot) {
        contrastBadge.textContent = '⚠️ Contraste Baixo';
        contrastBadge.className = 'contrast-badge warn';
      } else {
        contrastBadge.textContent = '✓ Legibilidade Ótima';
        contrastBadge.className = 'contrast-badge ok';
      }
    }
  }

  private isTooLight(hex: string): boolean {
    if (!hex || hex.length < 6) return false;
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.85;
  }

  private toggleCollapseSidebar = (): void => {
    this.state.isSidebarCollapsed = !this.state.isSidebarCollapsed;
    const grid = document.querySelector('.app-grid');
    grid?.classList.toggle('preview-collapsed', this.state.isSidebarCollapsed);

    const sidebar = document.querySelector('.preview-column');
    sidebar?.classList.toggle('collapsed', this.state.isSidebarCollapsed);

    const pill = document.getElementById('btn-expand-dock');
    const card = document.querySelector('.preview-sticky-card');

    pill?.classList.toggle('hidden', !this.state.isSidebarCollapsed);
    card?.classList.toggle('hidden', this.state.isSidebarCollapsed);
  };

  private showToast = (message: string): void => {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout((toast as any)._timer);
    (toast as any)._timer = setTimeout(() => {
      toast?.classList.remove('show');
    }, 2800);
  };

  private saveHistory(): void {
    try {
      const item = {
        data: this.state.data,
        type: this.state.contentType,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      let list = JSON.parse(localStorage.getItem('olivelas_qr_history') || '[]');
      list = [item, ...list.filter((x: any) => x.data !== item.data)].slice(0, 5);
      localStorage.setItem('olivelas_qr_history', JSON.stringify(list));
    } catch {}
  }

  private render(): void {
    this.appRoot.innerHTML = '';

    // 1. Header
    const header = renderHeader(this.state, this.toggleTheme, this.switchView);
    this.appRoot.appendChild(header);

    // 2. Main Content
    const main = document.createElement('main');
    main.className = 'main-container';

    if (this.state.activeView === 'docs') {
      const docs = renderDocsView(() => this.switchView('app'), this.showToast);
      main.appendChild(docs);
    } else {
      const grid = document.createElement('div');
      grid.className = `app-grid ${this.state.isSidebarCollapsed ? 'preview-collapsed' : ''}`;

      // Coluna de Controles (Esquerda)
      const controlsCol = document.createElement('section');
      controlsCol.className = 'controls-column';
      controlsCol.appendChild(renderContentPanel(this.state, this.updateState, this.showToast));
      controlsCol.appendChild(renderCustomizerPanel(this.state, this.updateState, this.showToast));

      // Coluna de Pré-Visualização (Direita)
      const previewCol = renderPreviewSidebar(
        this.state,
        this.qrEngine,
        this.toggleCollapseSidebar,
        this.showToast
      );

      grid.appendChild(controlsCol);
      grid.appendChild(previewCol);
      main.appendChild(grid);
    }

    this.appRoot.appendChild(main);

    // 3. Footer
    const footer = document.createElement('footer');
    footer.className = 'app-footer';
    footer.innerHTML = `
      <div class="footer-links">
        <a href="https://github.com/pycriador/olivelas-qrcode" target="_blank" rel="noopener noreferrer">GitHub do Projeto</a>
        <a href="#" id="footer-btn-docs">Documentação cURL & Python</a>
        <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a>
      </div>
      <p>Olivelas QR Code Studio &bull; 100% Client-side em TypeScript &bull; Sem limites de uso.</p>
    `;
    footer.querySelector('#footer-btn-docs')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('docs');
    });
    this.appRoot.appendChild(footer);

    // Monta o canvas inicial do QR Code se estiver no criador
    if (this.state.activeView === 'app') {
      setTimeout(() => this.initQRCanvas(), 0);
    }
  }

  private initQRCanvas(): void {
    const holder = document.getElementById('qr-canvas-holder');
    if (holder) {
      this.qrEngine.init(holder, this.state);
      this.updatePreviewVisuals();
    }
  }
}

// Inicia aplicação
new OlivelasApp();
