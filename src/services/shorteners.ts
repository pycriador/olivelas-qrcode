import { ShortenerProvider } from '../types';

/**
 * Catálogo com mais de 10 provedores de encurtamento de URL
 * Inclui tratamento de CORS e múltiplos fallbacks transparentes.
 */
export const URL_SHORTENERS: ShortenerProvider[] = [
  {
    id: 'tinyurl',
    name: 'TinyURL',
    domain: 'tinyurl.com',
    shorten: async (url: string) => {
      const endpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
      return fetchWithFallback(endpoint, 'text');
    }
  },
  {
    id: 'isgd',
    name: 'is.gd',
    domain: 'is.gd',
    shorten: async (url: string) => {
      const endpoint = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`;
      const res = await fetchWithFallback(endpoint, 'json');
      if (res && res.shorturl) return res.shorturl;
      throw new Error(res.errormessage || 'Erro ao encurtar com is.gd');
    }
  },
  {
    id: 'vgd',
    name: 'v.gd',
    domain: 'v.gd',
    shorten: async (url: string) => {
      const endpoint = `https://v.gd/create.php?format=json&url=${encodeURIComponent(url)}`;
      const res = await fetchWithFallback(endpoint, 'json');
      if (res && res.shorturl) return res.shorturl;
      throw new Error(res.errormessage || 'Erro ao encurtar com v.gd');
    }
  },
  {
    id: 'ulvis',
    name: 'Ulvis.net',
    domain: 'ulvis.net',
    shorten: async (url: string) => {
      const endpoint = `https://ulvis.net/api.php?url=${encodeURIComponent(url)}`;
      return fetchWithFallback(endpoint, 'text');
    }
  },
  {
    id: 'dagd',
    name: 'da.gd',
    domain: 'da.gd',
    shorten: async (url: string) => {
      const endpoint = `https://da.gd/s?url=${encodeURIComponent(url)}`;
      return fetchWithFallback(endpoint, 'text');
    }
  },
  {
    id: 'cleanuri',
    name: 'CleanURI',
    domain: 'cleanuri.com',
    shorten: async (url: string) => {
      const endpoint = 'https://cleanuri.com/api/v1/shorten';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `url=${encodeURIComponent(url)}`
        });
        const data = await response.json();
        if (data.result_url) return data.result_url;
      } catch (e) {
        // Fallback CORS
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://cleanuri.com/api/v1/shorten')}`;
        const response = await fetch(proxyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `url=${encodeURIComponent(url)}`
        });
        const data = await response.json();
        if (data.result_url) return data.result_url;
      }
      throw new Error('Falha no CleanURI');
    }
  },
  {
    id: 'onept',
    name: '1pt.co',
    domain: '1pt.co',
    shorten: async (url: string) => {
      const endpoint = `https://1pt.co/api/create?url=${encodeURIComponent(url)}`;
      const res = await fetchWithFallback(endpoint, 'json');
      if (res && res.short) {
        return `https://1pt.co/${res.short}`;
      }
      throw new Error('Erro ao encurtar com 1pt.co');
    }
  },
  {
    id: 'clckru',
    name: 'Clck.ru',
    domain: 'clck.ru',
    shorten: async (url: string) => {
      const endpoint = `https://clck.ru/--?url=${encodeURIComponent(url)}`;
      return fetchWithFallback(endpoint, 'text');
    }
  },
  {
    id: 'chilpit',
    name: 'Chilp.it',
    domain: 'chilp.it',
    shorten: async (url: string) => {
      const endpoint = `https://chilp.it/api.php?url=${encodeURIComponent(url)}`;
      return fetchWithFallback(endpoint, 'text');
    }
  },
  {
    id: 'spoo',
    name: 'Spoo.me',
    domain: 'spoo.me',
    shorten: async (url: string) => {
      const endpoint = 'https://spoo.me/';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: `url=${encodeURIComponent(url)}`
      });
      const data = await response.json();
      if (data && data.short_url) return data.short_url;
      throw new Error('Erro no Spoo.me');
    }
  },
  {
    id: 'gotiny',
    name: 'GoTiny',
    domain: 'gotiny.cc',
    shorten: async (url: string) => {
      const endpoint = 'https://gotiny.cc/api';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: url })
      });
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.code) {
        return `https://gotiny.cc/${data[0].code}`;
      }
      throw new Error('Erro no GoTiny');
    }
  }
];

/**
 * Função utilitária que tenta a chamada direta e recorre a proxy de CORS se bloqueado pelo navegador.
 */
async function fetchWithFallback(targetUrl: string, type: 'text' | 'json'): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const res = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const out = type === 'json' ? await res.json() : (await res.text()).trim();
    if (out) return out;
  } catch (err) {
    clearTimeout(timeoutId);
    // Fallback via CORS proxy público
    try {
      const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
      const pRes = await fetch(proxy);
      if (!pRes.ok) throw new Error(`Proxy status ${pRes.status}`);
      return type === 'json' ? await pRes.json() : (await pRes.text()).trim();
    } catch (e2) {
      throw new Error(`Não foi possível conectar ao encurtador. Verifique a URL.`);
    }
  }
}
