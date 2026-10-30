import { QRState, Preset } from '../types';
import { PRESETS_DATA } from '../services/presets';

export function renderPresetGallery(
  state: QRState,
  onApplyPreset: (preset: Preset) => void
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'preset-gallery-wrapper';

  let currentCategory = 'all';
  let searchTerm = '';

  const renderCards = () => {
    const grid = container.querySelector('#presets-dynamic-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = PRESETS_DATA.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: var(--text-muted);">Nenhum estilo encontrado para sua busca.</div>';
      return;
    }

    filtered.forEach(preset => {
      const card = document.createElement('div');
      card.className = `preset-card ${state.activePresetId === preset.id ? 'active' : ''}`;
      card.setAttribute('data-id', preset.id);

      card.innerHTML = `
        <div class="preset-preview-box" style="background: ${preset.previewGradient}">
          <div class="preset-preview-inner"></div>
        </div>
        <span class="preset-title">${preset.name}</span>
      `;

      card.addEventListener('click', () => {
        container.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        onApplyPreset(preset);
      });

      grid.appendChild(card);
    });
  };

  container.innerHTML = `
    <!-- Barra de Busca e Filtros -->
    <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 220px; position: relative;">
        <input type="text" id="preset-search-input" class="input-text no-icon" placeholder="Buscar entre os 54 modelos (ex: Indigo, Instagram, Luxo...)" style="padding-left: 2.2rem; font-size: 0.85rem;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
    </div>

    <div class="preset-filter-bar">
      <button class="filter-chip active" data-cat="all">Todos (54)</button>
      <button class="filter-chip" data-cat="popular">🌟 Populares</button>
      <button class="filter-chip" data-cat="business">💼 Corporativo & Luxo</button>
      <button class="filter-chip" data-cat="creative">🎨 Gradientes Vibrantes</button>
      <button class="filter-chip" data-cat="social">📱 Redes Sociais</button>
      <button class="filter-chip" data-cat="dark">🌑 AMOLED & Cyber</button>
      <button class="filter-chip" data-cat="pastel">🌸 Tons Pastel</button>
    </div>

    <!-- Grade Dinâmica -->
    <div id="presets-dynamic-grid" class="presets-grid"></div>
  `;

  // Eventos de Busca e Filtro
  container.querySelector('#preset-search-input')?.addEventListener('input', (e) => {
    searchTerm = (e.target as HTMLInputElement).value;
    renderCards();
  });

  container.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-cat') || 'all';
      renderCards();
    });
  });

  // Render inicial
  setTimeout(renderCards, 0);

  return container;
}
