import { ClaimInfo, JwtPayload } from '../types/jwt';

export interface KnownClaim {
  name: string;
  description: string;
  spec: string;
}

export const KNOWN_CLAIMS: Record<string, KnownClaim> = {
  // RFC 7519 Standard Registered Claims
  iss: {
    name: 'Issuer',
    description: 'Identifies the principal that issued the JWT (identity provider / auth server).',
    spec: 'RFC 7519 §4.1.1',
  },
  sub: {
    name: 'Subject',
    description: 'Identifies the principal that is the subject of the JWT (user / resource owner ID).',
    spec: 'RFC 7519 §4.1.2',
  },
  aud: {
    name: 'Audience',
    description: 'Identifies the recipients that the JWT is intended for (API / service resource).',
    spec: 'RFC 7519 §4.1.3',
  },
  exp: {
    name: 'Expiration Time',
    description: 'Unix timestamp identifying the time on or after which the JWT MUST NOT be accepted.',
    spec: 'RFC 7519 §4.1.4',
  },
  nbf: {
    name: 'Not Before',
    description: 'Unix timestamp identifying the time before which the JWT MUST NOT be accepted.',
    spec: 'RFC 7519 §4.1.5',
  },
  iat: {
    name: 'Issued At',
    description: 'Unix timestamp identifying the time at which the JWT was issued.',
    spec: 'RFC 7519 §4.1.6',
  },
  jti: {
    name: 'JWT ID',
    description: 'Unique identifier for the JWT token, often used to prevent replay attacks.',
    spec: 'RFC 7519 §4.1.7',
  },

  // OpenID Connect Standard Claims
  name: {
    name: 'Full Name',
    description: "End-User's full name in displayable form including all name parts.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  given_name: {
    name: 'Given Name',
    description: "Given name(s) or first name of the End-User.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  family_name: {
    name: 'Family Name',
    description: "Surname(s) or last name of the End-User.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  middle_name: {
    name: 'Middle Name',
    description: "Middle name(s) of the End-User.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  nickname: {
    name: 'Nickname',
    description: "Casual name of the End-User.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  preferred_username: {
    name: 'Preferred Username',
    description: "Shorthand name by which the End-User wishes to be referred to (handle/username).",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  profile: {
    name: 'Profile URL',
    description: "URL of the End-User's profile page.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  picture: {
    name: 'Picture URL',
    description: "URL of the End-User's profile picture.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  website: {
    name: 'Website URL',
    description: "URL of the End-User's web page or blog.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  email: {
    name: 'Email Address',
    description: "End-User's preferred e-mail address.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  email_verified: {
    name: 'Email Verified',
    description: "True if the End-User's e-mail address has been verified.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  gender: {
    name: 'Gender',
    description: "End-User's gender.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  birthdate: {
    name: 'Birthdate',
    description: "End-User's birthday, represented as an ISO 8601:2004 [ISO8601] YYYY-MM-DD format.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  zoneinfo: {
    name: 'Time Zone',
    description: "String representing the End-User's time zone (e.g. Europe/Paris or America/Los_Angeles).",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  locale: {
    name: 'Locale',
    description: "End-User's locale, represented as a BCP47 [RFC5646] language tag (e.g. en-US or fr-CA).",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  phone_number: {
    name: 'Phone Number',
    description: "End-User's preferred telephone number (E.164 format).",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  phone_number_verified: {
    name: 'Phone Number Verified',
    description: "True if the End-User's phone number has been verified.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  address: {
    name: 'Physical Address',
    description: "End-User's preferred postal address formatted as a JSON object.",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  updated_at: {
    name: 'Updated At',
    description: "Time the End-User's information was last updated (Unix timestamp).",
    spec: 'OpenID Connect Core 1.0 §5.1',
  },
  auth_time: {
    name: 'Authentication Time',
    description: 'Time when the End-User authentication occurred (Unix timestamp).',
    spec: 'OpenID Connect Core 1.0 §2',
  },
  nonce: {
    name: 'Nonce',
    description: 'String value used to associate a Client session with an ID Token to mitigate replay attacks.',
    spec: 'OpenID Connect Core 1.0 §3.1.2.1',
  },
  azp: {
    name: 'Authorized Party',
    description: 'Authorized party to which the ID Token was issued (Client ID).',
    spec: 'OpenID Connect Core 1.0 §3.1.3.6',
  },
  client_id: {
    name: 'Client ID',
    description: 'OAuth 2.0 Client Identifier requesting the token.',
    spec: 'RFC 6749 §2.2',
  },
  scope: {
    name: 'Access Scopes',
    description: 'Space-delimited list of OAuth 2.0 permission scopes granted to the token.',
    spec: 'RFC 6749 §3.3',
  },
  roles: {
    name: 'User Roles',
    description: 'Assigned user authorization roles (e.g., admin, editor, viewer).',
    spec: 'Identity / RBAC Custom Claim',
  },
  permissions: {
    name: 'Permissions',
    description: 'Granular permissions granted to this token.',
    spec: 'Identity / RBAC Custom Claim',
  },
  groups: {
    name: 'User Groups',
    description: 'Security or directory groups the user belongs to.',
    spec: 'Identity / Directory Custom Claim',
  },
};

export const ALGORITHM_INFO: Record<
  string,
  { name: string; type: 'Symmetric' | 'Asymmetric' | 'None'; description: string }
> = {
  HS256: {
    name: 'HMAC SHA-256',
    type: 'Symmetric',
    description: 'HMAC using SHA-256 hash algorithm with a shared secret key.',
  },
  HS384: {
    name: 'HMAC SHA-384',
    type: 'Symmetric',
    description: 'HMAC using SHA-384 hash algorithm with a shared secret key.',
  },
  HS512: {
    name: 'HMAC SHA-512',
    type: 'Symmetric',
    description: 'HMAC using SHA-512 hash algorithm with a shared secret key.',
  },
  RS256: {
    name: 'RSASSA-PKCS1-v1_5 SHA-256',
    type: 'Asymmetric',
    description: 'RSA signature using SHA-256 hash algorithm and PKCS#1 v1.5 padding.',
  },
  RS384: {
    name: 'RSASSA-PKCS1-v1_5 SHA-384',
    type: 'Asymmetric',
    description: 'RSA signature using SHA-384 hash algorithm and PKCS#1 v1.5 padding.',
  },
  RS512: {
    name: 'RSASSA-PKCS1-v1_5 SHA-512',
    type: 'Asymmetric',
    description: 'RSA signature using SHA-512 hash algorithm and PKCS#1 v1.5 padding.',
  },
  ES256: {
    name: 'ECDSA P-256 SHA-256',
    type: 'Asymmetric',
    description: 'Elliptic Curve Digital Signature Algorithm using curve P-256 and SHA-256.',
  },
  ES384: {
    name: 'ECDSA P-384 SHA-384',
    type: 'Asymmetric',
    description: 'Elliptic Curve Digital Signature Algorithm using curve P-384 and SHA-384.',
  },
  ES512: {
    name: 'ECDSA P-521 SHA-512',
    type: 'Asymmetric',
    description: 'Elliptic Curve Digital Signature Algorithm using curve P-521 and SHA-512.',
  },
  PS256: {
    name: 'RSASSA-PSS SHA-256',
    type: 'Asymmetric',
    description: 'RSA signature scheme with Probabilistic Signature Scheme (PSS) and SHA-256.',
  },
  PS384: {
    name: 'RSASSA-PSS SHA-384',
    type: 'Asymmetric',
    description: 'RSA signature scheme with Probabilistic Signature Scheme (PSS) and SHA-384.',
  },
  PS512: {
    name: 'RSASSA-PSS SHA-512',
    type: 'Asymmetric',
    description: 'RSA signature scheme with Probabilistic Signature Scheme (PSS) and SHA-512.',
  },
  EdDSA: {
    name: 'Edwards-curve DSA',
    type: 'Asymmetric',
    description: 'Edwards-curve Digital Signature Algorithm (Ed25519 / Ed448).',
  },
  none: {
    name: 'None (Unsecured)',
    type: 'None',
    description: 'Unsecured token without a digital signature or message authentication code.',
  },
};

/**
 * Returns human-readable description for signing algorithm
 */
export function getAlgorithmDescription(alg: string): string {
  const info = ALGORITHM_INFO[alg];
  if (info) {
    return `${info.name} (${info.type}) — ${info.description}`;
  }
  return `Algorithm: ${alg}`;
}

/**
 * Extracts and categorizes all claims from a JWT payload
 */
export function extractClaimInfo(payload: JwtPayload): ClaimInfo[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const claims: ClaimInfo[] = [];

  for (const [key, value] of Object.entries(payload)) {
    let valueType: ClaimInfo['valueType'] = 'string';
    let formattedValue = '';

    if (value === null) {
      valueType = 'null';
      formattedValue = 'null';
    } else if (value === undefined) {
      valueType = 'undefined';
      formattedValue = 'undefined';
    } else if (Array.isArray(value)) {
      valueType = 'array';
      formattedValue = JSON.stringify(value, null, 2);
    } else if (typeof value === 'object') {
      valueType = 'object';
      formattedValue = JSON.stringify(value, null, 2);
    } else if (typeof value === 'boolean') {
      valueType = 'boolean';
      formattedValue = value ? 'true' : 'false';
    } else if (typeof value === 'number') {
      valueType = 'number';
      formattedValue = String(value);
    } else {
      valueType = 'string';
      formattedValue = String(value);
    }

    const known = KNOWN_CLAIMS[key];
    const isStandard = Boolean(known);
    const description = known
      ? known.description
      : 'Custom application-defined claim not specified in RFC 7519 or OpenID Connect.';
    const spec = known?.spec;

    claims.push({
      key,
      value,
      formattedValue,
      valueType,
      description,
      isStandard,
      spec,
    });
  }

  // Sort: standard claims first, then custom claims alphabetically
  const standardKeysOrder = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti', 'name', 'email', 'scope', 'roles'];
  return claims.sort((a, b) => {
    const indexA = standardKeysOrder.indexOf(a.key);
    const indexB = standardKeysOrder.indexOf(b.key);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    if (a.isStandard && !b.isStandard) return -1;
    if (!a.isStandard && b.isStandard) return 1;

    return a.key.localeCompare(b.key);
  });
}
