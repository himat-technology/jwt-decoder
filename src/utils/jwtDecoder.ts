import {
  DecodedJwtResult,
  ErrorType,
  JwtHeader,
  JwtPayload,
  TokenPart,
  TokenSignature,
  TokenValidationStatus,
} from '../types/jwt';
import { extractClaimInfo, getAlgorithmDescription } from './jwtValidation';
import { evaluateTimestamps } from './timestampUtils';

/**
 * Robust Base64Url decoding that properly handles padding and UTF-8 / Unicode characters
 */
export function base64UrlDecode(input: string): string {
  if (!input) {
    return '';
  }

  // Replace Base64Url specific characters
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with '=' to make length a multiple of 4
  const mod4 = base64.length % 4;
  if (mod4 === 2) {
    base64 += '==';
  } else if (mod4 === 3) {
    base64 += '=';
  } else if (mod4 === 1) {
    throw new Error('Illegal base64url string: length mod 4 cannot be 1');
  }

  // Validate Base64 characters
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error('Base64 string contains invalid characters');
  }

  // Decode binary string
  const binaryString = atob(base64);

  // Convert binary string to Uint8Array bytes
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Decode bytes to UTF-8 string
  const decoder = new TextDecoder('utf-8', { fatal: true });
  return decoder.decode(bytes);
}

/**
 * Calculates byte size in UTF-8
 */
export function getByteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

/**
 * Safely decodes and parses a JWT part (Header or Payload) into JSON
 */
export function parseTokenPart<T = Record<string, unknown>>(
  rawPart: string,
  partName: 'Header' | 'Payload',
): TokenPart<T> {
  if (!rawPart) {
    return {
      raw: '',
      decoded: null,
      formattedJson: '',
      charCount: 0,
      byteLength: 0,
      isValid: false,
      error: `${partName} is missing`,
    };
  }

  const charCount = rawPart.length;
  const byteLength = getByteLength(rawPart);

  let decodedText = '';
  try {
    decodedText = base64UrlDecode(rawPart);
  } catch (err) {
    return {
      raw: rawPart,
      decoded: null,
      formattedJson: '',
      charCount,
      byteLength,
      isValid: false,
      error: `Failed to Base64Url decode ${partName}: ${err instanceof Error ? err.message : 'Invalid Base64Url encoding'}`,
    };
  }

  try {
    const parsed = JSON.parse(decodedText) as T;
    const formattedJson = JSON.stringify(parsed, null, 2);

    return {
      raw: rawPart,
      decoded: parsed,
      formattedJson,
      charCount,
      byteLength,
      isValid: true,
    };
  } catch (err) {
    return {
      raw: rawPart,
      decoded: null,
      formattedJson: decodedText, // Show raw decoded text even if not valid JSON
      charCount,
      byteLength,
      isValid: false,
      error: `Invalid JSON in ${partName}: ${err instanceof Error ? err.message : 'JSON parse error'}`,
    };
  }
}

/**
 * Decodes and inspects a complete JWT token string
 */
export function decodeJwt(rawInput: string): DecodedJwtResult {
  const trimmed = (rawInput || '').trim();

  // Handle empty input
  if (!trimmed) {
    const emptyStatus: TokenValidationStatus = {
      structureValid: false,
      headerDecoded: false,
      payloadDecoded: false,
      signaturePresent: false,
      isExpired: false,
      errorType: 'EMPTY',
    };

    return {
      rawToken: '',
      totalCharCount: 0,
      totalByteLength: 0,
      header: {
        raw: '',
        decoded: null,
        formattedJson: '',
        charCount: 0,
        byteLength: 0,
        isValid: false,
      },
      payload: {
        raw: '',
        decoded: null,
        formattedJson: '',
        charCount: 0,
        byteLength: 0,
        isValid: false,
      },
      signature: {
        raw: '',
        charCount: 0,
        byteLength: 0,
        isPresent: false,
      },
      status: emptyStatus,
      timestamps: [],
      claims: [],
    };
  }

  const totalCharCount = trimmed.length;
  const totalByteLength = getByteLength(trimmed);

  // Split JWT by dots
  const parts = trimmed.split('.');

  if (parts.length !== 3) {
    const errorType: ErrorType = 'INVALID_STRUCTURE';
    const status: TokenValidationStatus = {
      structureValid: false,
      headerDecoded: false,
      payloadDecoded: false,
      signaturePresent: parts.length > 2 && !!parts[2],
      isExpired: false,
      errorType,
      errorMessage: `Invalid JWT structure: A standard JWT must contain 3 dot-separated sections (Header.Payload.Signature). Found ${parts.length} section${parts.length === 1 ? '' : 's'}.`,
    };

    // Attempt to decode available parts for partial inspection
    const header = parseTokenPart<JwtHeader>(parts[0] || '', 'Header');
    const payload = parseTokenPart<JwtPayload>(parts[1] || '', 'Payload');
    const sigRaw = parts[2] || '';

    return {
      rawToken: trimmed,
      totalCharCount,
      totalByteLength,
      header,
      payload,
      signature: {
        raw: sigRaw,
        charCount: sigRaw.length,
        byteLength: getByteLength(sigRaw),
        isPresent: sigRaw.length > 0,
      },
      status,
      timestamps: payload.decoded ? evaluateTimestamps(payload.decoded) : [],
      claims: payload.decoded ? extractClaimInfo(payload.decoded) : [],
    };
  }

  const [headerRaw, payloadRaw, signatureRaw] = parts;

  // Parse header and payload
  const header = parseTokenPart<JwtHeader>(headerRaw, 'Header');
  const payload = parseTokenPart<JwtPayload>(payloadRaw, 'Payload');

  // Signature info
  const signature: TokenSignature = {
    raw: signatureRaw,
    charCount: signatureRaw.length,
    byteLength: getByteLength(signatureRaw),
    isPresent: signatureRaw.length > 0,
    algorithm: header.decoded?.alg,
  };

  // Determine error type
  let errorType: ErrorType = 'NONE';
  let errorMessage: string | undefined;

  if (!header.isValid) {
    if (header.error?.includes('Base64Url')) {
      errorType = 'INVALID_HEADER_BASE64';
    } else {
      errorType = 'INVALID_HEADER_JSON';
    }
    errorMessage = header.error;
  } else if (!payload.isValid) {
    if (payload.error?.includes('Base64Url')) {
      errorType = 'INVALID_PAYLOAD_BASE64';
    } else {
      errorType = 'INVALID_PAYLOAD_JSON';
    }
    errorMessage = payload.error;
  }

  // Timestamps evaluation
  const timestamps = payload.decoded ? evaluateTimestamps(payload.decoded) : [];
  const expTimestamp = timestamps.find((t) => t.claim === 'exp');
  const isExpired = expTimestamp ? expTimestamp.status === 'expired' : false;

  // Claims extraction
  const claims = payload.decoded ? extractClaimInfo(payload.decoded) : [];

  const status: TokenValidationStatus = {
    structureValid: true,
    headerDecoded: header.isValid,
    payloadDecoded: payload.isValid,
    signaturePresent: signature.isPresent,
    isExpired,
    errorType,
    errorMessage,
  };

  const algorithmDescription = header.decoded?.alg
    ? getAlgorithmDescription(header.decoded.alg)
    : undefined;

  return {
    rawToken: trimmed,
    totalCharCount,
    totalByteLength,
    header,
    payload,
    signature,
    status,
    timestamps,
    claims,
    algorithmDescription,
  };
}
