import { describe, it, expect } from 'vitest';
import { formatRelativeTime, evaluateTimestamps, formatLocalDateTime } from '../timestampUtils';

describe('timestampUtils', () => {
  describe('formatRelativeTime', () => {
    it('formats seconds correctly', () => {
      expect(formatRelativeTime(5, false)).toBe('just now');
      expect(formatRelativeTime(5, true)).toBe('in a few seconds');
      expect(formatRelativeTime(30, false)).toBe('30 seconds ago');
      expect(formatRelativeTime(30, true)).toBe('in 30 seconds');
    });

    it('formats minutes correctly', () => {
      expect(formatRelativeTime(60, false)).toBe('1 minute ago');
      expect(formatRelativeTime(60, true)).toBe('in 1 minute');
      expect(formatRelativeTime(300, false)).toBe('5 minutes ago');
      expect(formatRelativeTime(300, true)).toBe('in 5 minutes');
    });

    it('formats hours correctly', () => {
      expect(formatRelativeTime(3600, false)).toBe('1 hour ago');
      expect(formatRelativeTime(7200, false)).toBe('2 hours ago');
      expect(formatRelativeTime(7200, true)).toBe('in 2 hours');
    });

    it('formats days correctly', () => {
      expect(formatRelativeTime(86400, false)).toBe('1 day ago');
      expect(formatRelativeTime(259200, true)).toBe('in 3 days');
    });
  });

  describe('formatLocalDateTime', () => {
    it('formats a valid timestamp to iso and local strings', () => {
      const res = formatLocalDateTime(1672531199);
      expect(res.isoDate).toBe('2022-12-31T23:59:59.000Z');
      expect(res.localDate).not.toBe('Invalid Date');
    });

    it('handles NaN gracefully', () => {
      const res = formatLocalDateTime(NaN);
      expect(res.isoDate).toBe('Invalid Date');
      expect(res.localDate).toBe('Invalid Date');
    });
  });

  describe('evaluateTimestamps', () => {
    const fixedNow = 1756281600; // Mock current time

    it('evaluates exp claim when expired', () => {
      const payload = {
        exp: fixedNow - 3600, // Expired 1 hour ago
      };
      const evals = evaluateTimestamps(payload, fixedNow);
      const exp = evals.find((e) => e.claim === 'exp');

      expect(exp).toBeDefined();
      expect(exp?.status).toBe('expired');
      expect(exp?.badgeColor).toBe('red');
      expect(exp?.relativeText).toBe('Expired 1 hour ago');
    });

    it('evaluates exp claim when valid in future', () => {
      const payload = {
        exp: fixedNow + 7200, // Expires in 2 hours
      };
      const evals = evaluateTimestamps(payload, fixedNow);
      const exp = evals.find((e) => e.claim === 'exp');

      expect(exp).toBeDefined();
      expect(exp?.status).toBe('valid');
      expect(exp?.badgeColor).toBe('green');
      expect(exp?.relativeText).toBe('Expires in 2 hours');
    });

    it('evaluates nbf claim when not active yet', () => {
      const payload = {
        nbf: fixedNow + 1800, // Valid in 30 minutes
      };
      const evals = evaluateTimestamps(payload, fixedNow);
      const nbf = evals.find((e) => e.claim === 'nbf');

      expect(nbf).toBeDefined();
      expect(nbf?.status).toBe('future');
      expect(nbf?.badgeColor).toBe('yellow');
      expect(nbf?.relativeText).toContain('Not active yet (Valid in 30 minutes)');
    });

    it('evaluates nbf claim when active', () => {
      const payload = {
        nbf: fixedNow - 600, // Active since 10 minutes ago
      };
      const evals = evaluateTimestamps(payload, fixedNow);
      const nbf = evals.find((e) => e.claim === 'nbf');

      expect(nbf).toBeDefined();
      expect(nbf?.status).toBe('active');
      expect(nbf?.badgeColor).toBe('green');
      expect(nbf?.relativeText).toContain('Active (since 10 minutes ago)');
    });

    it('evaluates iat claim correctly', () => {
      const payload = {
        iat: fixedNow - 300, // Issued 5 minutes ago
      };
      const evals = evaluateTimestamps(payload, fixedNow);
      const iat = evals.find((e) => e.claim === 'iat');

      expect(iat).toBeDefined();
      expect(iat?.status).toBe('issued');
      expect(iat?.badgeColor).toBe('blue');
      expect(iat?.relativeText).toBe('Issued 5 minutes ago');
    });
  });
});
