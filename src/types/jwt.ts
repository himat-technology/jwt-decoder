export interface JwtHeader {
  alg?: string;
  typ?: string;
  cty?: string;
  kid?: string;
  jku?: string;
  x5u?: string;
  x5t?: string;
  crit?: string[];
  [key: string]: unknown;
}

export interface JwtPayload {
  // RFC 7519 standard registered claims
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;

  // Common OIDC & identity claims
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: Record<string, unknown>;
  updated_at?: number;

  // Authorization & scopes
  scope?: string;
  roles?: string[] | string;
  permissions?: string[] | string;
  groups?: string[] | string;
  client_id?: string;
  azp?: string;
  nonce?: string;
  auth_time?: number;

  // Custom / dynamic claims
  [key: string]: unknown;
}

export type ErrorType =
  | 'EMPTY'
  | 'INVALID_STRUCTURE'
  | 'INVALID_HEADER_BASE64'
  | 'INVALID_HEADER_JSON'
  | 'INVALID_PAYLOAD_BASE64'
  | 'INVALID_PAYLOAD_JSON'
  | 'NONE';

export interface TokenPart<T = Record<string, unknown>> {
  raw: string;
  decoded: T | null;
  formattedJson: string;
  charCount: number;
  byteLength: number;
  isValid: boolean;
  error?: string;
}

export interface TokenSignature {
  raw: string;
  charCount: number;
  byteLength: number;
  isPresent: boolean;
  algorithm?: string;
}

export type TimestampStatusType = 'valid' | 'expired' | 'future' | 'active' | 'issued' | 'invalid';

export interface TimestampEvaluation {
  claim: 'exp' | 'nbf' | 'iat';
  label: string;
  rawTimestamp: number;
  isoDate: string;
  localDate: string;
  relativeText: string;
  status: TimestampStatusType;
  badgeColor: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
  secondsDifference: number;
}

export interface ClaimInfo {
  key: string;
  value: unknown;
  formattedValue: string;
  valueType: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null' | 'undefined';
  description: string;
  isStandard: boolean;
  spec?: string;
}

export interface TokenValidationStatus {
  structureValid: boolean;
  headerDecoded: boolean;
  payloadDecoded: boolean;
  signaturePresent: boolean;
  isExpired: boolean;
  errorType: ErrorType;
  errorMessage?: string;
}

export interface DecodedJwtResult {
  rawToken: string;
  totalCharCount: number;
  totalByteLength: number;
  header: TokenPart<JwtHeader>;
  payload: TokenPart<JwtPayload>;
  signature: TokenSignature;
  status: TokenValidationStatus;
  timestamps: TimestampEvaluation[];
  claims: ClaimInfo[];
  algorithmDescription?: string;
}
