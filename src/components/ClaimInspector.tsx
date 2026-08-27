import React, { useState, useMemo } from 'react';
import { ClaimInfo } from '../types/jwt';
import { CopyButton } from './CopyButton';
import { Shield, Search, BookOpen, Sparkles, Filter } from 'lucide-react';

interface ClaimInspectorProps {
  claims: ClaimInfo[];
}

export const ClaimInspector: React.FC<ClaimInspectorProps> = ({ claims }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'standard' | 'custom'>('all');

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesSearch =
        claim.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.formattedValue.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'standard') return claim.isStandard;
      if (filterType === 'custom') return !claim.isStandard;
      return true;
    });
  }, [claims, searchQuery, filterType]);

  const standardCount = useMemo(() => claims.filter((c) => c.isStandard).length, [claims]);
  const customCount = useMemo(() => claims.filter((c) => !c.isStandard).length, [claims]);

  if (!claims || claims.length === 0) {
    return null;
  }

  const renderValueDisplay = (claim: ClaimInfo) => {
    switch (claim.valueType) {
      case 'boolean':
        return (
          <span
            className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-semibold ${
              claim.value
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {claim.value ? 'true' : 'false'}
          </span>
        );
      case 'number':
        return <span className="font-mono text-cyan-300 font-medium">{claim.formattedValue}</span>;
      case 'array':
        return (
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1.5">
              {Array.isArray(claim.value) &&
              claim.value.length > 0 &&
              typeof claim.value[0] !== 'object' ? (
                claim.value.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-purple-200 font-mono text-xs"
                  >
                    {String(item)}
                  </span>
                ))
              ) : (
                <pre className="p-2 bg-slate-950 rounded text-xs font-mono text-purple-200 overflow-x-auto max-w-full">
                  {claim.formattedValue}
                </pre>
              )}
            </div>
          </div>
        );
      case 'object':
        return (
          <pre className="p-2.5 bg-slate-950 rounded border border-slate-800/80 text-xs font-mono text-purple-200 overflow-x-auto max-w-full leading-relaxed">
            {claim.formattedValue}
          </pre>
        );
      case 'null':
        return <span className="text-slate-500 italic font-mono">null</span>;
      case 'string':
      default:
        return (
          <span className="font-mono text-emerald-300 text-xs break-all">
            &quot;{String(claim.value)}&quot;
          </span>
        );
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 border-slate-800">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Claims Inspector & Descriptions
          </h3>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            {claims.length} Claim{claims.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter Pills */}
          <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-slate-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'all'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({claims.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('standard')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'standard'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard ({standardCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('custom')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterType === 'custom'
                  ? 'bg-teal-500/20 text-teal-300 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom ({customCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Claims Table / List */}
      {filteredClaims.length === 0 ? (
        <div className="py-8 text-center text-slate-500">
          <Filter className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p className="text-xs">No claims match the search or filter criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-4 w-40">Claim Name</th>
                <th className="py-2.5 px-4">Value</th>
                <th className="py-2.5 px-4 min-w-[280px]">RFC / Spec Description</th>
                <th className="py-2.5 px-3 text-right w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClaims.map((claim) => (
                <tr
                  key={claim.key}
                  className="hover:bg-slate-900/40 transition-colors group"
                >
                  {/* Claim Key */}
                  <td className="py-3 px-4 align-top">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-mono font-bold text-teal-300 bg-teal-950/50 px-2 py-0.5 rounded border border-teal-500/30 text-xs">
                        {claim.key}
                      </span>
                      {claim.isStandard ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                          <BookOpen className="w-2.5 h-2.5" />
                          Standard
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-purple-400">
                          <Sparkles className="w-2.5 h-2.5" />
                          Custom
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Claim Value */}
                  <td className="py-3 px-4 align-top">
                    <div className="max-w-md">{renderValueDisplay(claim)}</div>
                  </td>

                  {/* Description & Spec */}
                  <td className="py-3 px-4 align-top text-slate-300 leading-relaxed">
                    <p className="text-xs">{claim.description}</p>
                    {claim.spec && (
                      <span className="inline-block mt-1 text-[10px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {claim.spec}
                      </span>
                    )}
                  </td>

                  {/* Copy Button */}
                  <td className="py-3 px-3 align-top text-right">
                    <CopyButton
                      text={
                        typeof claim.value === 'object'
                          ? JSON.stringify(claim.value, null, 2)
                          : String(claim.value)
                      }
                      iconOnly
                      size="sm"
                      title={`Copy ${claim.key} value`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
