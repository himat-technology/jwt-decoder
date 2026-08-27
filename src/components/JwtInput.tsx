import React, { useState } from 'react';
import { DecodedJwtResult } from '../types/jwt';
import { SAMPLE_TOKENS } from '../utils/sampleJwt';
import {
  Trash2,
  Sparkles,
  Clipboard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Lock,
} from 'lucide-react';

interface JwtInputProps {
  token: string;
  setToken: (token: string) => void;
  decodedResult: DecodedJwtResult;
  loadSample: (sampleId?: string) => void;
  clearToken: () => void;
}

export const JwtInput: React.FC<JwtInputProps> = ({
  token,
  setToken,
  decodedResult,
  loadSample,
  clearToken,
}) => {
  const [showSampleMenu, setShowSampleMenu] = useState(false);
  const { status, totalCharCount, totalByteLength } = decodedResult;

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        const text = await navigator.clipboard.readText();
        if (text) setToken(text.trim());
      }
    } catch (err) {
      console.warn('Clipboard read failed: ', err);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6 border-slate-800 space-y-4">
      {/* Privacy Notice Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-teal-200">100% Client-Side Privacy: </span>
            <span className="text-teal-300/90">
              Your JWT is decoded entirely in your browser. No token data is ever sent to a server or third-party API.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-teal-400 font-mono shrink-0">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Zero Network Transmission</span>
        </div>
      </div>

      {/* Input Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <label htmlFor="jwt-textarea" className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Encoded JWT Token
          </label>
          {totalCharCount > 0 && (
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {totalCharCount} Chars • {totalByteLength} Bytes
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sample Token Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSampleMenu((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {showSampleMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowSampleMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 py-1.5 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-slate-400 border-b border-slate-800">
                    Choose Sample Token
                  </div>
                  {SAMPLE_TOKENS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => {
                        loadSample(sample.id);
                        setShowSampleMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-800/80 transition-colors text-xs flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{sample.name}</span>
                        <span className="text-[10px] font-mono text-teal-300 bg-teal-950 px-1.5 py-0.5 rounded border border-teal-800/50">
                          {sample.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 line-clamp-1">
                        {sample.description}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Paste Button */}
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={clearToken}
            disabled={!token}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/30 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          id="jwt-textarea"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JSON Web Token (JWT) here... (e.g. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          rows={5}
          className="w-full p-4 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-teal-500 text-slate-200 font-mono text-xs leading-relaxed placeholder-slate-600 focus:outline-none transition-colors resize-y shadow-inner"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* Live Token Status Summary Bar */}
      {status.errorType !== 'EMPTY' && (
        <div
          className={`p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border ${
            status.errorMessage
              ? 'bg-red-950/30 border-red-500/30 text-red-200'
              : 'bg-slate-900/80 border-slate-800 text-slate-300'
          }`}
        >
          {status.errorMessage ? (
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-semibold text-red-300">{status.errorMessage}</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {/* Structure Valid */}
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-medium">Structure Valid</span>
              </div>

              {/* Header Decoded */}
              <div className="flex items-center gap-1.5 text-rose-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-medium">Header Decoded</span>
              </div>

              {/* Payload Decoded */}
              <div className="flex items-center gap-1.5 text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-medium">Payload Decoded</span>
              </div>

              {/* Signature Info */}
              <div className="flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="font-medium">Signature Not Verified (Key Required)</span>
              </div>
            </div>
          )}

          {decodedResult.algorithmDescription && !status.errorMessage && (
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800 shrink-0">
              {decodedResult.header.decoded?.alg || 'None'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
