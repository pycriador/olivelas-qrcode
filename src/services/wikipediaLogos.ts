import { WikipediaLogo } from '../types';

/**
 * Logotipos oficiais com vetores extraídos do Wikimedia Commons / Wikipedia.
 * Cada logotipo inclui a referência canônica do arquivo no Wikimedia Commons.
 */
export const WIKIPEDIA_LOGOS: WikipediaLogo[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    brandColor: '#25D366',
    wikipediaFile: 'File:WhatsApp.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:WhatsApp.svg',
    svg: `<svg viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="waGrad" x1="87.608" y1="0" x2="87.608" y2="175.552" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#2ad06d"/><stop offset="100%" stop-color="#1ebb5d"/></linearGradient></defs><circle cx="87.608" cy="87.776" r="87.608" fill="url(#waGrad)"/><path fill="#fff" d="m140.2 40.5c-13.1-13.1-30.6-20.3-49.2-20.3-38.3 0-69.5 31.2-69.5 69.5 0 12.2 3.2 24.2 9.3 34.8l-9.9 36.1 37-9.7c10.2 5.6 21.7 8.5 33.1 8.5h.1c38.3 0 69.5-31.2 69.5-69.5-.1-18.6-7.3-36.2-20.4-49.4zm-49.2 107.2h-.1c-10.4 0-20.5-2.8-29.3-8.1l-2.1-1.2-21.8 5.7 5.8-21.2-1.4-2.2c-5.8-9.2-8.8-19.9-8.8-30.8 0-31.8 25.9-57.7 57.8-57.7 15.4 0 29.9 6 40.8 16.9s16.9 25.4 16.9 40.8c-.1 31.8-26 57.8-57.9 57.8zm31.7-43.3c-1.7-.9-10.3-5.1-11.9-5.7-1.6-.6-2.8-.9-3.9.9s-4.5 5.7-5.5 6.8c-1.1 1.1-2.1 1.3-3.9.4s-7.4-2.7-14.1-8.7c-5.2-4.6-8.7-10.4-9.7-12.1-1-1.7-.1-2.7.8-3.5.8-.8 1.7-2.1 2.6-3.1.9-1.1 1.1-1.7 1.7-2.9.6-1.1.3-2.1-.1-3s-3.9-9.5-5.4-13c-1.4-3.4-2.9-3-3.9-3h-3.4c-1.1 0-3 .4-4.6 2.1s-6.1 6-6.1 14.5c0 8.6 6.3 16.8 7.1 18 1 1.1 12.3 18.8 29.8 26.4 4.2 1.8 7.4 2.9 9.9 3.7 4.2 1.3 8 1.1 11 .7 3.4-.5 10.3-4.2 11.8-8.3 1.4-4.1 1.4-7.6 1-8.3-.4-.9-1.6-1.4-3.3-2.3z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'instagram',
    name: 'Instagram',
    brandColor: '#E4405F',
    wikipediaFile: 'File:Instagram_logo_2016.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Instagram_logo_2016.svg',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="igWiki" cx="19%" cy="99%" r="109%"><stop offset="0%" stop-color="#ffd521"/><stop offset="5%" stop-color="#ffd521"/><stop offset="34%" stop-color="#f50000"/><stop offset="61%" stop-color="#b900b4"/><stop offset="100%" stop-color="#4600f1"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#igWiki)"/><path fill="#fff" d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zm6.2-8.2a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM18.8 6a4.2 4.2 0 0 0-2.4-2.4 7.2 7.2 0 0 0-2.4-.5c-1 0-1.3 0-3.9 0s-2.9 0-3.9.1a7.2 7.2 0 0 0-2.4.4 4.2 4.2 0 0 0-2.4 2.4 7.2 7.2 0 0 0-.5 2.4c0 1 0 1.3 0 3.9s0 2.9.1 3.9a7.2 7.2 0 0 0 .4 2.4 4.2 4.2 0 0 0 2.4 2.4 7.2 7.2 0 0 0 2.4.5c1 0 1.3 0 3.9 0s2.9 0 3.9-.1a7.2 7.2 0 0 0 2.4-.4 4.2 4.2 0 0 0 2.4-2.4 7.2 7.2 0 0 0 .5-2.4c0-1 0-1.3 0-3.9s0-2.9-.1-3.9a7.2 7.2 0 0 0-.4-2.4zm-1.8 9.8a2.9 2.9 0 0 1-1.6 1.6c-.6.3-1.4.4-2.6.4s-1.6 0-3.8 0-3.1 0-3.8-.1a2.9 2.9 0 0 1-1.6-1.6c-.3-.6-.4-1.4-.4-2.6s0-1.6 0-3.8 0-3.1.1-3.8a2.9 2.9 0 0 1 1.6-1.6c.6-.3 1.4-.4 2.6-.4s1.6 0 3.8 0 3.1 0 3.8.1a2.9 2.9 0 0 1 1.6 1.6c.3.6.4 1.4.4 2.6s0 1.6 0 3.8 0 3.1-.1 3.8z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'pix',
    name: 'Pix',
    brandColor: '#32BCAD',
    wikipediaFile: 'File:Pix_logo.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Pix_logo.svg',
    svg: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="110" fill="#32BCAD"/><path fill="#fff" d="M149.3 128.5c-8.9 0-17.5 3.5-23.8 9.8l-52.6 52.6c-13.1 13.1-13.1 34.5 0 47.6l52.6 52.6c6.3 6.3 14.8 9.8 23.8 9.8s17.5-3.5 23.8-9.8l52.6-52.6c13.1-13.1 13.1-34.5 0-47.6l-52.6-52.6c-6.3-6.3-14.8-9.8-23.8-9.8zm213.4 0c-8.9 0-17.5 3.5-23.8 9.8l-52.6 52.6c-13.1 13.1-13.1 34.5 0 47.6l52.6 52.6c6.3 6.3 14.8 9.8 23.8 9.8s17.5-3.5 23.8-9.8l52.6-52.6c13.1-13.1 13.1-34.5 0-47.6l-52.6-52.6c-6.3-6.3-14.9-9.8-23.8-9.8zM256 215.1l-40.9 40.9 40.9 40.9 40.9-40.9-40.9-40.9z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'youtube',
    name: 'YouTube',
    brandColor: '#FF0000',
    wikipediaFile: 'File:YouTube_full-color_icon_(2017).svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:YouTube_full-color_icon_(2017).svg',
    svg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" rx="28" fill="#FF0000"/><path fill="#fff" d="M102.7 44.8c-1-3.7-3.9-6.6-7.6-7.6-6.7-1.8-33.6-1.8-33.6-1.8s-26.9 0-33.6 1.8c-3.7 1-6.6 3.9-7.6 7.6-1.8 6.7-1.8 20.7-1.8 20.7s0 14 1.8 20.7c1 3.7 3.9 6.6 7.6 7.6 6.7 1.8 33.6 1.8 33.6 1.8s26.9 0 33.6-1.8c3.7-1 6.6-3.9 7.6-7.6 1.8-6.7 1.8-20.7 1.8-20.7s0-14-1.8-20.7zM53.5 76.5V52.8l20.8 11.9-20.8 11.8z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    brandColor: '#0A66C2',
    wikipediaFile: 'File:LinkedIn_icon.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:LinkedIn_icon.svg',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="5" fill="#0A66C2"/><path fill="#fff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66 1.66 1.66 0 0 0-3.32 0 1.66 1.66 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'spotify',
    name: 'Spotify',
    brandColor: '#1ED760',
    wikipediaFile: 'File:Spotify_logo_without_text.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Spotify_logo_without_text.svg',
    svg: `<svg viewBox="0 0 167.5 167.5" xmlns="http://www.w3.org/2000/svg"><circle cx="83.75" cy="83.75" r="83.75" fill="#1ED760"/><path fill="#fff" d="M123.6 119.5c-1.6 2.6-5 3.4-7.6 1.8-20.9-12.8-47.2-15.7-78.2-8.6-3 .7-5.9-1.2-6.6-4.2s1.2-5.9 4.2-6.6c34-7.8 63.1-4.5 86.4 9.7 2.6 1.6 3.4 5 1.8 7.9zm10.7-23.7c-2 3.2-6.3 4.3-9.5 2.2-23.9-14.7-60.4-19-88.7-10.4-3.7 1.1-7.6-1-8.7-4.7-1.1-3.7 1-7.6 4.7-8.7 32.2-9.8 72.4-5 99.9 12 3.3 2.1 4.3 6.4 2.3 9.6zm1.1-24.8C106.8 54 59.8 52.4 32.6 60.6c-4.4 1.3-9-1.2-10.4-5.6s1.2-9 5.6-10.4C59.2 35 111.1 36.8 144.5 56.6c4 2.4 5.2 7.6 2.8 11.6s-7.8 5.2-11.9 2.8z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'github',
    name: 'GitHub',
    brandColor: '#24292F',
    wikipediaFile: 'File:Octicons-mark-github.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Octicons-mark-github.svg',
    svg: `<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292F"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    brandColor: '#000000',
    wikipediaFile: 'File:X_logo_2023_original.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:X_logo_2023_original.svg',
    svg: `<svg viewBox="0 0 300 300.251" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" rx="60" fill="#000"/><path fill="#fff" d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    brandColor: '#000000',
    wikipediaFile: 'File:TikTok_logo.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:TikTok_logo.svg',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="5" fill="#000"/><path fill="#25F4EE" d="M16.5 7.5a4.5 4.5 0 0 1-2.5-1.8V14a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1v2.3a2.3 2.3 0 1 0 1.2 2.1V3h2.3a4.5 4.5 0 0 0 2.5 4.5z" opacity="0.85"/><path fill="#FE2C55" d="M16.2 7.2a4.5 4.5 0 0 1-2.5-1.8v8.3a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1v2.3a2.3 2.3 0 1 0 1.2 2.1V2.7h2.3a4.5 4.5 0 0 0 2.5 4.5z" opacity="0.85"/><path fill="#fff" d="M16.3 7.3a4.5 4.5 0 0 1-2.5-1.8v8.3a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1v2.3a2.3 2.3 0 1 0 1.2 2.1V2.8h2.3a4.5 4.5 0 0 0 2.5 4.5z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'telegram',
    name: 'Telegram',
    brandColor: '#24A1DE',
    wikipediaFile: 'File:Telegram_logo.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Telegram_logo.svg',
    svg: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><circle cx="120" cy="120" r="120" fill="#24A1DE"/><path fill="#fff" d="M183.9 66.8L51.5 117.8c-9 3.6-8.9 8.7-1.6 10.9l33.8 10.6 78.4-49.5c3.7-2.3 7.1-1 4.3 1.4l-63.5 57.3-2.5 35.7c3.5 0 5-1.6 7-3.5l16.8-16.3 34.9 25.8c6.4 3.5 11 1.7 12.6-6l22.9-107.9c2.3-9.4-3.6-13.6-9.8-10.4z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'facebook',
    name: 'Facebook',
    brandColor: '#1877F2',
    wikipediaFile: 'File:Facebook_Logo_(2019).png.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Facebook_Logo_(2019).png.svg',
    svg: `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#1877F2"/><path fill="#fff" d="M24 18.5h-3.5V31h-5.2V18.5h-2.5v-4.4h2.5V11c0-2.1 1-5.4 5.4-5.4l4 .02v4.3h-2.9c-.5 0-1.1.2-1.1 1.2v3h4z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'google',
    name: 'Google',
    brandColor: '#4285F4',
    wikipediaFile: 'File:Google_%22G%22_logo.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Google_%22G%22_logo.svg',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.25 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.32a7.18 7.18 0 0 1 0-4.64V6.59H1.27a11.96 11.96 0 0 0 0 10.82l4.01-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.59l4.01 3.09C6.23 6.85 8.88 4.75 12 4.75z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    brandColor: '#0284C7',
    wikipediaFile: 'File:Wifi_symbol.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:Wifi_symbol.svg',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="#0284C7"/><path fill="#fff" d="M50 70a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-18.4-14a26 26 0 0 1 36.8 0l-5.6 5.6a18 18 0 0 0-25.6 0l-5.6-5.6zm-11.3-11.3a42 42 0 0 1 59.4 0l-5.6 5.6a34 34 0 0 0-48.2 0l-5.6-5.6zm-11.3-11.3a58 58 0 0 1 82 0l-5.6 5.6a50 50 0 0 0-70.8 0l-5.6-5.6z"/></svg>`,
    badgeDataUrl: ''
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    brandColor: '#009EE3',
    wikipediaFile: 'File:MercadoPago_logo.svg',
    wikipediaUrl: 'https://commons.wikimedia.org/wiki/File:MercadoPago_logo.svg',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="#009EE3"/><path fill="#fff" d="M30 45a20 20 0 0 1 40 0v10a10 10 0 0 1-20 0v-5a5 5 0 0 0-10 0v5a10 10 0 0 1-20 0V45zm10 0a10 10 0 0 1 20 0v5h-20v-5z"/></svg>`,
    badgeDataUrl: ''
  }
];

// Pré-computa data URLs para uso imediato pelo QRCodeStyling
WIKIPEDIA_LOGOS.forEach(logo => {
  logo.badgeDataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(logo.svg);
});

export function getWikipediaLogoById(id: string): WikipediaLogo | undefined {
  return WIKIPEDIA_LOGOS.find(l => l.id === id);
}
