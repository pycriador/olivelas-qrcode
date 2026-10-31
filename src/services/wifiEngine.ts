/**
 * Motor oficial de geração de Wi-Fi QR Code (Padrão Internacional ZXing / Android / iOS)
 * Compatível com câmeras nativas do iPhone (iOS 11+), Android (Samsung, Xiaomi, Motorola, Pixel, etc.)
 * e leitores universais de QR Code.
 */

export interface WifiOptions {
  ssid: string;
  password?: string;
  encryption?: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

/**
 * Escapa caracteres especiais (\, ;, ,, :, ") de acordo com o padrão estrito ZXing
 */
export function escapeWifiString(text: string): string {
  if (!text) return '';
  return text.replace(/([\\;,:"])/g, '\\$1');
}

/**
 * Gera a string de conexão Wi-Fi universal padronizada
 * Formato padrão: WIFI:T:<tipo>;S:<ssid_escapado>;P:<senha_escapada>;H:<true|false>;;
 */
export function generateWifiString(options: WifiOptions): string {
  const cleanSsid = (options.ssid || '').trim();
  if (!cleanSsid) {
    return '';
  }

  const enc = options.encryption || 'WPA';
  let payload = 'WIFI:';

  // 1. Tipo de Autenticação / Criptografia (T)
  payload += `T:${enc};`;

  // 2. Nome da Rede (SSID) com escape de caracteres
  payload += `S:${escapeWifiString(cleanSsid)};`;

  // 3. Senha (P) - Obrigatória apenas se não for rede aberta
  if (enc !== 'nopass') {
    const cleanPass = (options.password || '').trim();
    payload += `P:${escapeWifiString(cleanPass)};`;
  }

  // 4. Rede Oculta (H)
  if (options.hidden) {
    payload += 'H:true;';
  }

  // 5. Finalizador de registro duplo ponto-e-vírgula
  payload += ';';

  return payload;
}
