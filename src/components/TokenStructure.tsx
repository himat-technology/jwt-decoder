import React from 'react';
import { DecodedJwtResult } from '../types/jwt';
import { CopyButton } from './CopyButton';
import { Layers, ShieldCheck, Key, FileText } from 'lucide-react';

interface TokenStructureProps {
  decodedResult: DecodedJwtResult;
}

export const TokenStructure: React.FC<TokenStructureProps> = ({ decodedResult }) => {
  const { header, payload, signature, rawToken } = decodedResult;

  if (!rawToken) {
    return null;
  }

  return (
    <div className="glass-card rounded-xl p-4 sm:p-5 border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Encoded Token Structure
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            ({decodedResult.totalByteLength} Bytes • {decodedResult.totalCharCount} Chars)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={rawToken} label="Copy Full JWT" size="sm" />
        </div>
      </div>

      {/* Legend & Stats Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        {/* Header Pill */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Key className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="font-semibold text-rose-300">1. Header</span>
            <span className="text-[10px] text-rose-400/80 font-mono">
              ({header.byteLength} B)
            </span>
          </div>
          {header.raw && <CopyButton text={header.raw} iconOnly size="sm" title="Copy Header Base64" />}
        </div>

        {/* Payload Pill */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-purple-950/30 border border-purple-500/30 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="font-semibold text-purple-300">2. Payload</span>
            <span className="text-[10px] text-purple-400/80 font-mono">
              ({payload.byteLength} B)
            </span>
          </div>
          {payload.raw && <CopyButton text={payload.raw} iconOnly size="sm" title="Copy Payload Base64" />}
        </div>

        {/* Signature Pill */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-teal-950/30 border border-teal-500/30 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="font-semibold text-teal-300">3. Signature</span>
            <span className="text-[10px] text-teal-400/80 font-mono">
              ({signature.byteLength} B)
            </span>
          </div>
          {signature.raw && <CopyButton text={signature.raw} iconOnly size="sm" title="Copy Signature Base64" />}
        </div>
      </div>

      {/* Visual Token Segment Breakdown */}
      <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800/90 font-mono text-xs leading-relaxed break-all select-all">
        {header.raw ? (
          <span className="text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/20 hover:bg-rose-500/20 transition-colors">
            {header.raw}
          </span>
        ) : (
          <span className="text-rose-500/50 italic">[Missing Header]</span>
        )}

        <span className="text-slate-400 font-bold px-1 select-none">.</span>

        {payload.raw ? (
          <span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
            {payload.raw}
          </span>
        ) : (
          <span className="text-purple-500/50 italic">[Missing Payload]</span>
        )}

        <span className="text-slate-400 font-bold px-1 select-none">.</span>

        {signature.raw ? (
          <span className="text-teal-400 bg-teal-500/10 px-1 py-0.5 rounded border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
            {signature.raw}
          </span>
        ) : (
          <span className="text-teal-500/50 italic">[Empty Signature]</span>
        )}
      </div>
    </div>
  );
};
