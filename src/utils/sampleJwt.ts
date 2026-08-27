/**
 * Helper to encode UTF-8 JSON object to Base64Url for realistic sample generation
 */
function encodeBase64UrlJson(obj: unknown): string {
  const jsonStr = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Standard Valid Sample Token (Valid for 1 year into the future from a realistic base)
 * Algorithm: HS256
 */
const standardHeader = {
  alg: 'HS256',
  typ: 'JWT',
  kid: 'himat-key-2026',
};

const standardPayload = {
  iss: 'https://auth.himat.tech/',
  sub: 'usr_8f9a2b7c4e1d',
  aud: 'https://api.himat.tech/v1',
  exp: 1819440000, // Year 2027
  nbf: 1756281600, // Valid since 2025
  iat: 1756281600,
  jti: 'tok_99a8b7c6d5e4f3a2',
  name: 'Alex Vance',
  email: 'alex.vance@example.com',
  email_verified: true,
  roles: ['admin', 'developer', 'billing_manager'],
  scope: 'openid profile email read:audit write:deploy',
  organization: {
    id: 'org_enterprise_982',
    name: 'HiMat Technologies',
    tier: 'enterprise',
  },
};

const standardSignature = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';

export const SAMPLE_JWT_STANDARD = `${encodeBase64UrlJson(standardHeader)}.${encodeBase64UrlJson(standardPayload)}.${standardSignature}`;

/**
 * Expired Sample Token (Expired in 2023)
 * Algorithm: RS256
 */
const expiredHeader = {
  alg: 'RS256',
  typ: 'JWT',
  kid: 'legacy-key-rsa-2022',
};

const expiredPayload = {
  iss: 'https://accounts.example.org',
  sub: 'user_9921_expired',
  aud: 'https://api.example.org',
  exp: 1672531199, // Dec 31, 2022 (Expired)
  iat: 1640995200, // Jan 1, 2022
  name: 'Sarah Connor',
  email: 'sarah.connor@cyberdyne.test',
  scope: 'read:profile write:timeline',
  token_use: 'access',
};

const expiredSignature = 'ek1Pq-3Wz4Y_9LmNoPqRsTuVwXyZ0123456789ABCDE';

export const SAMPLE_JWT_EXPIRED = `${encodeBase64UrlJson(expiredHeader)}.${encodeBase64UrlJson(expiredPayload)}.${expiredSignature}`;

/**
 * Unicode & Internationalization Sample Token
 * Algorithm: ES256
 */
const unicodeHeader = {
  alg: 'ES256',
  typ: 'JWT',
  kid: 'ecdsa-p256-intl',
};

const unicodePayload = {
  iss: 'https://idp.global-services.example',
  sub: 'usr_intl_442',
  aud: 'https://dashboard.global.example',
  exp: 1893456000, // 2030
  iat: 1756281600,
  name: 'María José García-Hernández (田中 太郎) 🚀',
  preferred_username: 'maría_🚀_dev',
  email: 'maria.garcia@münchen-consulting.de',
  locale: 'es-ES',
  greeting: '¡Hola! Bienvenue! こんにちは! 🌍✨',
  badges: ['🌟 Top Contributor', '⚡ Performance Hero', '🛡️ Security Champion'],
  metadata: {
    city: 'München',
    country: 'Deutschland 🇩🇪',
    timezone: 'Europe/Berlin',
  },
};

const unicodeSignature = 'MEQCIFh_Yj49tZg7-KqKzQ_19wJ8Uj8R_T1w_xyz87654321AiAR7890';

export const SAMPLE_JWT_UNICODE = `${encodeBase64UrlJson(unicodeHeader)}.${encodeBase64UrlJson(unicodePayload)}.${unicodeSignature}`;

export interface SampleTokenOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  token: string;
}

export const SAMPLE_TOKENS: SampleTokenOption[] = [
  {
    id: 'standard',
    name: 'Standard Token',
    badge: 'HS256 • Valid',
    description: 'Realistic modern token with identity, role permissions, and active expiration timestamp.',
    token: SAMPLE_JWT_STANDARD,
  },
  {
    id: 'expired',
    name: 'Expired Token',
    badge: 'RS256 • Expired',
    description: 'RS256 signed token with an expiration timestamp in the past to test expiration warning.',
    token: SAMPLE_JWT_EXPIRED,
  },
  {
    id: 'unicode',
    name: 'Unicode & Emoji',
    badge: 'ES256 • UTF-8',
    description: 'Token featuring multilingual UTF-8 characters, German umlauts, Japanese Kanji, and emojis.',
    token: SAMPLE_JWT_UNICODE,
  },
];
