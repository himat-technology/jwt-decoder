import { describe, it, expect } from 'vitest';
import { base64UrlDecode, decodeJwt, parseTokenPart } from '../jwtDecoder';
import { SAMPLE_JWT_STANDARD, SAMPLE_JWT_UNICODE, SAMPLE_JWT_EXPIRED } from '../sampleJwt';

describe('base64UrlDecode', () => {
  it('correctly decodes standard ASCII base64url strings', () => {
    // '{"alg":"HS256","typ":"JWT"}' -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    const encoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const decoded = base64UrlDecode(encoded);
    expect(decoded).toBe('{"alg":"HS256","typ":"JWT"}');
  });

  it('correctly handles - and _ replacements and padding', () => {
    // Test base64url characters - and _
    const input = 'PDw_Pz8-Pg'; // '<<???>>' in base64: PDw/Pz8+Pg==
    const decoded = base64UrlDecode(input);
    expect(decoded).toBe('<<???>>');
  });

  it('correctly decodes UTF-8 and Unicode characters including emojis', () => {
    const unicodeText = JSON.stringify({ message: '¡Hola München! こんにちは 🌍🚀' });
    const bytes = new TextEncoder().encode(unicodeText);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Url = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const decoded = base64UrlDecode(base64Url);
    expect(decoded).toBe(unicodeText);
    expect(JSON.parse(decoded).message).toBe('¡Hola München! こんにちは 🌍🚀');
  });

  it('returns empty string on empty input', () => {
    expect(base64UrlDecode('')).toBe('');
  });

  it('throws an error on invalid base64 characters', () => {
    expect(() => base64UrlDecode('invalid@characters!#')).toThrow();
  });
});

describe('parseTokenPart', () => {
  it('successfully parses valid Base64Url JSON', () => {
    const raw = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const part = parseTokenPart(raw, 'Header');
    expect(part.isValid).toBe(true);
    expect(part.decoded).toEqual({ alg: 'HS256', typ: 'JWT' });
    expect(part.charCount).toBe(raw.length);
    expect(part.byteLength).toBe(raw.length);
  });

  it('returns invalid status on invalid Base64 string', () => {
    const part = parseTokenPart('!invalid_base64!', 'Header');
    expect(part.isValid).toBe(false);
    expect(part.decoded).toBeNull();
    expect(part.error).toContain('Failed to Base64Url decode Header');
  });

  it('returns invalid status on valid Base64 that is not JSON', () => {
    // "Hello World" base64url is "SGVsbG8gV29ybGQ"
    const part = parseTokenPart('SGVsbG8gV29ybGQ', 'Payload');
    expect(part.isValid).toBe(false);
    expect(part.decoded).toBeNull();
    expect(part.error).toContain('Invalid JSON in Payload');
    expect(part.formattedJson).toBe('Hello World');
  });

  it('handles empty input gracefully', () => {
    const part = parseTokenPart('', 'Header');
    expect(part.isValid).toBe(false);
    expect(part.error).toBe('Header is missing');
  });
});

describe('decodeJwt', () => {
  it('returns empty state for empty input', () => {
    const result = decodeJwt('');
    expect(result.status.errorType).toBe('EMPTY');
    expect(result.status.structureValid).toBe(false);
    expect(result.header.decoded).toBeNull();
    expect(result.payload.decoded).toBeNull();
    expect(result.signature.isPresent).toBe(false);
  });

  it('handles whitespace-only input as empty', () => {
    const result = decodeJwt('   \n  \t ');
    expect(result.status.errorType).toBe('EMPTY');
  });

  it('decodes a valid standard JWT token', () => {
    const result = decodeJwt(SAMPLE_JWT_STANDARD);
    expect(result.status.structureValid).toBe(true);
    expect(result.status.headerDecoded).toBe(true);
    expect(result.status.payloadDecoded).toBe(true);
    expect(result.status.signaturePresent).toBe(true);
    expect(result.status.errorType).toBe('NONE');
    expect(result.header.decoded?.alg).toBe('HS256');
    expect(result.payload.decoded?.name).toBe('Alex Vance');
    expect(result.payload.decoded?.email).toBe('alex.vance@example.com');
    expect(result.claims.length).toBeGreaterThan(0);
    expect(result.timestamps.length).toBeGreaterThan(0);
  });

  it('decodes a token with Unicode and emojis properly', () => {
    const result = decodeJwt(SAMPLE_JWT_UNICODE);
    expect(result.status.headerDecoded).toBe(true);
    expect(result.status.payloadDecoded).toBe(true);
    expect(result.payload.decoded?.name).toContain('María José García-Hernández (田中 太郎) 🚀');
    expect(result.payload.decoded?.greeting).toBe('¡Hola! Bienvenue! こんにちは! 🌍✨');
  });

  it('decodes an expired token and reports isExpired accurately', () => {
    const result = decodeJwt(SAMPLE_JWT_EXPIRED);
    expect(result.status.structureValid).toBe(true);
    expect(result.status.isExpired).toBe(true);
    const expClaim = result.timestamps.find((t) => t.claim === 'exp');
    expect(expClaim?.status).toBe('expired');
  });

  it('identifies token structure errors when dot count is not 2 (sections != 3)', () => {
    const invalidToken = 'headerPart.payloadPart';
    const result = decodeJwt(invalidToken);
    expect(result.status.structureValid).toBe(false);
    expect(result.status.errorType).toBe('INVALID_STRUCTURE');
    expect(result.status.errorMessage).toContain('A standard JWT must contain 3 dot-separated sections');
  });

  it('identifies corrupted header Base64 error', () => {
    const parts = SAMPLE_JWT_STANDARD.split('.');
    const corruptedToken = `$$$invalid^^^.${parts[1]}.${parts[2]}`;
    const result = decodeJwt(corruptedToken);
    expect(result.status.structureValid).toBe(true);
    expect(result.status.headerDecoded).toBe(false);
    expect(result.status.errorType).toBe('INVALID_HEADER_BASE64');
  });

  it('identifies corrupted payload JSON error', () => {
    const parts = SAMPLE_JWT_STANDARD.split('.');
    // "Not a JSON" Base64Url is "Tm90IGEgSlNPTg"
    const corruptedToken = `${parts[0]}.Tm90IGEgSlNPTg.${parts[2]}`;
    const result = decodeJwt(corruptedToken);
    expect(result.status.structureValid).toBe(true);
    expect(result.status.headerDecoded).toBe(true);
    expect(result.status.payloadDecoded).toBe(false);
    expect(result.status.errorType).toBe('INVALID_PAYLOAD_JSON');
  });
});
