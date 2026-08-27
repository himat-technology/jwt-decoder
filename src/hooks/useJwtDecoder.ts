import { useState, useEffect, useCallback, useMemo } from 'react';
import { DecodedJwtResult } from '../types/jwt';
import { decodeJwt } from '../utils/jwtDecoder';
import { SAMPLE_JWT_STANDARD, SAMPLE_TOKENS } from '../utils/sampleJwt';

export interface UseJwtDecoderReturn {
  token: string;
  setToken: (token: string) => void;
  decodedResult: DecodedJwtResult;
  loadSample: (sampleId?: string) => void;
  clearToken: () => void;
  isCustomToken: boolean;
}

export function useJwtDecoder(initialToken: string = SAMPLE_JWT_STANDARD): UseJwtDecoderReturn {
  const [token, setToken] = useState<string>(initialToken);
  const [tick, setTick] = useState<number>(0);

  // Re-render every 5 seconds so live timestamp relative information updates smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Compute decoded result whenever token changes or ticker fires
  const decodedResult = useMemo(() => {
    return decodeJwt(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tick]);

  const loadSample = useCallback((sampleId?: string) => {
    if (!sampleId || sampleId === 'standard') {
      setToken(SAMPLE_JWT_STANDARD);
      return;
    }
    const match = SAMPLE_TOKENS.find((s) => s.id === sampleId);
    if (match) {
      setToken(match.token);
    } else {
      setToken(SAMPLE_JWT_STANDARD);
    }
  }, []);

  const clearToken = useCallback(() => {
    setToken('');
  }, []);

  const isCustomToken = useMemo(() => {
    return !SAMPLE_TOKENS.some((s) => s.token.trim() === token.trim()) && token.trim().length > 0;
  }, [token]);

  return {
    token,
    setToken,
    decodedResult,
    loadSample,
    clearToken,
    isCustomToken,
  };
}
