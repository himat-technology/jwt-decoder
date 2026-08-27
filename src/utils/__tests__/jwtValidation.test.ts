import { describe, it, expect } from 'vitest';
import { extractClaimInfo, getAlgorithmDescription, KNOWN_CLAIMS } from '../jwtValidation';
import { JwtPayload } from '../../types/jwt';

describe('jwtValidation', () => {
  describe('getAlgorithmDescription', () => {
    it('returns detailed description for HS256', () => {
      const desc = getAlgorithmDescription('HS256');
      expect(desc).toContain('HMAC SHA-256');
      expect(desc).toContain('Symmetric');
    });

    it('returns detailed description for RS256', () => {
      const desc = getAlgorithmDescription('RS256');
      expect(desc).toContain('RSASSA-PKCS1-v1_5');
      expect(desc).toContain('Asymmetric');
    });

    it('returns detailed description for ES256', () => {
      const desc = getAlgorithmDescription('ES256');
      expect(desc).toContain('ECDSA P-256');
      expect(desc).toContain('Asymmetric');
    });

    it('returns fallback for unknown algorithm', () => {
      const desc = getAlgorithmDescription('CUSTOM_ALG');
      expect(desc).toBe('Algorithm: CUSTOM_ALG');
    });
  });

  describe('extractClaimInfo', () => {
    it('extracts standard and custom claims with proper metadata', () => {
      const payload: JwtPayload = {
        iss: 'https://auth.example.com',
        sub: 'user_123',
        email: 'user@example.com',
        custom_tenant_id: 'tenant_abc',
        custom_roles: ['admin', 'moderator'],
        is_active: true,
        metadata: { department: 'Engineering' },
      };

      const claims = extractClaimInfo(payload);

      // Verify standard claims
      const issClaim = claims.find((c) => c.key === 'iss');
      expect(issClaim).toBeDefined();
      expect(issClaim?.isStandard).toBe(true);
      expect(issClaim?.description).toBe(KNOWN_CLAIMS.iss.description);
      expect(issClaim?.valueType).toBe('string');

      // Verify custom string claim
      const tenantClaim = claims.find((c) => c.key === 'custom_tenant_id');
      expect(tenantClaim).toBeDefined();
      expect(tenantClaim?.isStandard).toBe(false);
      expect(tenantClaim?.description).toContain('Custom application-defined claim');

      // Verify custom array claim
      const rolesClaim = claims.find((c) => c.key === 'custom_roles');
      expect(rolesClaim).toBeDefined();
      expect(rolesClaim?.valueType).toBe('array');
      expect(rolesClaim?.formattedValue).toContain('"admin"');

      // Verify boolean claim
      const boolClaim = claims.find((c) => c.key === 'is_active');
      expect(boolClaim?.valueType).toBe('boolean');
      expect(boolClaim?.formattedValue).toBe('true');

      // Verify object claim
      const objClaim = claims.find((c) => c.key === 'metadata');
      expect(objClaim?.valueType).toBe('object');
      expect(objClaim?.formattedValue).toContain('"department": "Engineering"');
    });

    it('handles empty or null payload gracefully', () => {
      expect(extractClaimInfo({} as JwtPayload)).toEqual([]);
    });
  });
});
