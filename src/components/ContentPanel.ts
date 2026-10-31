import { QRState, ContentType } from '../types';
import { URL_SHORTENERS, shortenUrlWithFallback } from '../services/shorteners';

export function renderContentPanel(
  state: QRState,
  onUpdateState: (partial: Partial<QRState>) => void,
  onShowToast: (msg: string) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'panel-card';

  container.innerHTML = `
    <div class="panel-title-bar">
      <h2 class="panel-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        1. Conteúdo do QR Code
      </h2>
    </div>

    <!-- Segmented Control Elegante de Tipos de Conteúdo (Sem rolagem horizontal) -->
    <div class="content-type-tabs" role="tablist">
      <button class="content-type-btn ${state.contentType === 'url' ? 'active' : ''}" data-type="url" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>Link / URL</span>
      </button>
      <button class="content-type-btn ${state.contentType === 'whatsapp' ? 'active' : ''}" data-type="whatsapp" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>WhatsApp</span>
      </button>
      <button class="content-type-btn ${state.contentType === 'pix' ? 'active' : ''}" data-type="pix" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 12l10 10 10-10L12 2z"/><path d="M7 12h10"/><path d="M12 7v10"/></svg>
        <span>Pix</span>
      </button>
      <button class="content-type-btn ${state.contentType === 'wifi' ? 'active' : ''}" data-type="wifi" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
        <span>Wi-Fi</span>
      </button>
      <button class="content-type-btn ${state.contentType === 'vcard' ? 'active' : ''}" data-type="vcard" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>Contato</span>
      </button>
      <button class="content-type-btn ${state.contentType === 'text' ? 'active' : ''}" data-type="text" type="button">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
        <span>Texto</span>
      </button>
    </div>

    <!-- Painel URL com Encurtadores -->
    <div id="content-panel-url" class="content-form-section ${state.contentType === 'url' ? '' : 'hidden'}">
      <div class="input-group">
        <span class="input-icon-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </span>
        <input type="url" id="input-main-url" class="input-text" placeholder="Cole sua URL aqui (ex: https://meusite.com.br)" value="${state.rawUrl}" spellcheck="false" autocomplete="off">
        <button type="button" id="btn-paste-clipboard" class="input-addon-btn" title="Colar link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
          Colar
        </button>
      </div>

      <!-- Barra de Encurtamento de URL (10+ Provedores) -->
      <div class="shortener-bar-card">
        <div class="shortener-bar-header">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" stroke-width="2.2"><path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/><path d="M9 19.8V15m0 0H4.2m4.8 0L3 21"/><path d="M15 4.2V9m0 0h4.8M15 9l6-6"/><path d="M9 4.2V9m0 0H4.2M9 9 3 3"/></svg>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">Encurtador de URL</span>
            <span class="badge-tag-count" style="font-size: 0.7rem;">11 Serviços Disponíveis</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Links curtos geram QR Codes mais fáceis de escanear!</span>
        </div>

        <div class="shortener-controls-row">
          <select id="select-shortener-provider" class="shortener-select" aria-label="Selecione o encurtador">
            ${URL_SHORTENERS.map(s => {
              const tag = s.id === 'isgd' ? ' (Nativo) ★ Recomendado' : (['vgd', 'dagd', 'clckru'].includes(s.id) ? ' (Nativo)' : '');
              return `<option value="${s.id}" ${s.id === 'isgd' ? 'selected' : ''}>${s.name}${tag}</option>`;
            }).join('')}
          </select>
          <button type="button" id="btn-execute-shorten" class="btn-shorten-action">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span id="btn-shorten-label">Encurtar URL</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Painel WhatsApp -->
    <div id="content-panel-whatsapp" class="content-form-section ${state.contentType === 'whatsapp' ? '' : 'hidden'}">
      <div class="form-grid-2">
        <div class="form-field-group">
          <label class="form-label">Número com DDI e DDD (ex: 5511999998888)</label>
          <input type="tel" id="input-wa-phone" class="input-text no-icon" placeholder="Ex: 5511999998888">
        </div>
        <div class="form-field-group">
          <label class="form-label">Mensagem Automática</label>
          <input type="text" id="input-wa-msg" class="input-text no-icon" placeholder="Ex: Olá, gostaria de mais informações!">
        </div>
      </div>
    </div>

    <!-- Painel Pix -->
    <div id="content-panel-pix" class="content-form-section ${state.contentType === 'pix' ? '' : 'hidden'}">
      <div class="form-grid-2">
        <div class="form-field-group" style="grid-column: span 2;">
          <label class="form-label">Chave Pix (E-mail, CPF/CNPJ, Telefone ou Aleatória)</label>
          <input type="text" id="input-pix-key" class="input-text no-icon" placeholder="suachave@pix.com.br">
        </div>
        <div class="form-field-group">
          <label class="form-label">Nome do Beneficiário</label>
          <input type="text" id="input-pix-name" class="input-text no-icon" placeholder="Ex: Maria Silva">
        </div>
        <div class="form-field-group">
          <label class="form-label">Cidade</label>
          <input type="text" id="input-pix-city" class="input-text no-icon" placeholder="Ex: SAO PAULO">
        </div>
        <div class="form-field-group">
          <label class="form-label">Valor R$ (Opcional)</label>
          <input type="number" step="0.01" id="input-pix-amount" class="input-text no-icon" placeholder="Ex: 50.00">
        </div>
      </div>
    </div>

    <!-- Painel Wi-Fi -->
    <div id="content-panel-wifi" class="content-form-section ${state.contentType === 'wifi' ? '' : 'hidden'}">
      <div class="form-grid-2">
        <div class="form-field-group">
          <label class="form-label">Nome da Rede (SSID)</label>
          <input type="text" id="input-wifi-ssid" class="input-text no-icon" placeholder="Ex: MinhaCasa_5G">
        </div>
        <div class="form-field-group">
          <label class="form-label">Senha do Wi-Fi</label>
          <input type="text" id="input-wifi-pass" class="input-text no-icon" placeholder="Senha da rede">
        </div>
        <div class="form-field-group">
          <label class="form-label">Segurança</label>
          <select id="select-wifi-enc" class="input-text no-icon">
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Rede Aberta (Sem senha)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Painel VCard / Contato -->
    <div id="content-panel-vcard" class="content-form-section ${state.contentType === 'vcard' ? '' : 'hidden'}">
      <div class="form-grid-2">
        <div class="form-field-group">
          <label class="form-label">Nome Completo</label>
          <input type="text" id="input-vcard-name" class="input-text no-icon" placeholder="Ex: Carlos Eduardo">
        </div>
        <div class="form-field-group">
          <label class="form-label">Telefone / WhatsApp</label>
          <input type="tel" id="input-vcard-tel" class="input-text no-icon" placeholder="+55 11 98888-7777">
        </div>
        <div class="form-field-group">
          <label class="form-label">E-mail</label>
          <input type="email" id="input-vcard-email" class="input-text no-icon" placeholder="carlos@empresa.com">
        </div>
        <div class="form-field-group">
          <label class="form-label">Empresa / Cargo</label>
          <input type="text" id="input-vcard-org" class="input-text no-icon" placeholder="Ex: Diretor de Tecnologia">
        </div>
      </div>
    </div>

    <!-- Painel Texto Livre -->
    <div id="content-panel-text" class="content-form-section ${state.contentType === 'text' ? '' : 'hidden'}">
      <div class="form-field-group">
        <label class="form-label">Texto</label>
        <textarea id="input-text-free" class="input-text no-icon" rows="3" placeholder="Digite ou cole qualquer texto aqui..."></textarea>
      </div>
    </div>
  `;

  // --- Handlers de Eventos ---

  // Troca de Aba
  container.querySelectorAll('.content-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type') as ContentType;
      container.querySelectorAll('.content-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      container.querySelectorAll('.content-form-section').forEach(p => p.classList.add('hidden'));
      container.querySelector(`#content-panel-${type}`)?.classList.remove('hidden');

      onUpdateState({ contentType: type });
    });
  });

  // Input de URL Principal
  const urlInput = container.querySelector('#input-main-url') as HTMLInputElement;
  urlInput?.addEventListener('input', () => {
    let val = urlInput.value.trim();
    if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
      val = 'https://' + val;
    }
    onUpdateState({ rawUrl: urlInput.value, data: val || 'https://github.com/pycriador/olivelas-qrcode' });
  });

  // Botão Colar
  container.querySelector('#btn-paste-clipboard')?.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        urlInput.value = text;
        let val = text.trim();
        if (val && !val.startsWith('http://') && !val.startsWith('https://')) {
          val = 'https://' + val;
        }
        onUpdateState({ rawUrl: text, data: val });
        onShowToast('Link colado com sucesso!');
      }
    } catch {
      urlInput.focus();
      onShowToast('Pressione Ctrl+V para colar');
    }
  });

  // Executar Encurtador de URL
  const btnShorten = container.querySelector('#btn-execute-shorten') as HTMLButtonElement;
  const selectShortener = container.querySelector('#select-shortener-provider') as HTMLSelectElement;
  const shortenLabel = container.querySelector('#btn-shorten-label') as HTMLSpanElement;

  btnShorten?.addEventListener('click', async () => {
    const raw = urlInput.value.trim();
    if (!raw) {
      onShowToast('Por favor, digite ou cole uma URL primeiro');
      urlInput.focus();
      return;
    }

    let urlToShorten = raw;
    if (!urlToShorten.startsWith('http://') && !urlToShorten.startsWith('https://')) {
      urlToShorten = 'https://' + urlToShorten;
    }

    const providerId = selectShortener.value;
    btnShorten.disabled = true;
    shortenLabel.textContent = 'Encurtando...';

    try {
      const res = await shortenUrlWithFallback(urlToShorten, providerId);
      if (res && res.shortUrl) {
        urlInput.value = res.shortUrl;
        onUpdateState({ rawUrl: res.shortUrl, data: res.shortUrl });
        try {
          await navigator.clipboard.writeText(res.shortUrl);
        } catch {}
        
        if (res.usedFallback) {
          onShowToast(`Encurtado com ${res.providerName} (alta disponibilidade)! Copiado!`);
        } else {
          onShowToast(`Encurtado via ${res.providerName}! Link copiado com sucesso!`);
        }
      } else {
        throw new Error('Retorno vazio');
      }
    } catch (err: any) {
      onShowToast(`Erro ao encurtar: ${err.message || 'Tente novamente.'}`);
    } finally {
      btnShorten.disabled = false;
      shortenLabel.textContent = 'Encurtar URL';
    }
  });

  // Formulários dinâmicos
  const syncOtherInputs = () => {
    const waPhone = (container.querySelector('#input-wa-phone') as HTMLInputElement)?.value.replace(/\D/g, '') || '';
    const waMsg = encodeURIComponent((container.querySelector('#input-wa-msg') as HTMLInputElement)?.value || '');
    
    const pixKey = (container.querySelector('#input-pix-key') as HTMLInputElement)?.value.trim() || '';
    const pixName = (container.querySelector('#input-pix-name') as HTMLInputElement)?.value.trim() || 'RECEBEDOR';
    const pixCity = (container.querySelector('#input-pix-city') as HTMLInputElement)?.value.trim() || 'BRASILIA';
    const pixAmt = (container.querySelector('#input-pix-amount') as HTMLInputElement)?.value.trim() || '';

    const wifiSsid = (container.querySelector('#input-wifi-ssid') as HTMLInputElement)?.value || '';
    const wifiPass = (container.querySelector('#input-wifi-pass') as HTMLInputElement)?.value || '';
    const wifiEnc = (container.querySelector('#select-wifi-enc') as HTMLSelectElement)?.value || 'WPA';

    const vName = (container.querySelector('#input-vcard-name') as HTMLInputElement)?.value || '';
    const vTel = (container.querySelector('#input-vcard-tel') as HTMLInputElement)?.value || '';
    const vEmail = (container.querySelector('#input-vcard-email') as HTMLInputElement)?.value || '';
    const vOrg = (container.querySelector('#input-vcard-org') as HTMLInputElement)?.value || '';

    const textFree = (container.querySelector('#input-text-free') as HTMLTextAreaElement)?.value || '';

    let generatedData = state.data;
    if (state.contentType === 'whatsapp') {
      generatedData = `https://wa.me/${waPhone}${waMsg ? '?text=' + waMsg : ''}`;
    } else if (state.contentType === 'pix') {
      generatedData = pixKey ? `PIX: chave=${pixKey}; valor=${pixAmt}; nome=${pixName}; cidade=${pixCity};` : 'PIX';
    } else if (state.contentType === 'wifi') {
      generatedData = `WIFI:S:${wifiSsid};T:${wifiEnc};P:${wifiPass};;`;
    } else if (state.contentType === 'vcard') {
      generatedData = `BEGIN:VCARD\nVERSION:3.0\nN:${vName}\nFN:${vName}\nORG:${vOrg}\nTEL:${vTel}\nEMAIL:${vEmail}\nEND:VCARD`;
    } else if (state.contentType === 'text') {
      generatedData = textFree || 'Olá, mundo!';
    }

    onUpdateState({ data: generatedData });
  };

  ['input-wa-phone', 'input-wa-msg', 'input-pix-key', 'input-pix-name', 'input-pix-city', 'input-pix-amount',
   'input-wifi-ssid', 'input-wifi-pass', 'select-wifi-enc', 'input-vcard-name', 'input-vcard-tel', 'input-vcard-email', 'input-vcard-org', 'input-text-free'].forEach(id => {
    container.querySelector(`#${id}`)?.addEventListener('input', syncOtherInputs);
  });

  return container;
}
