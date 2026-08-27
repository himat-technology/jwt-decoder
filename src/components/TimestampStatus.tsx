import React from 'react';
import { TimestampEvaluation } from '../types/jwt';
import { Clock, CheckCircle2, XCircle, AlertTriangle, Info, Calendar } from 'lucide-react';

interface TimestampStatusProps {
  timestamps: TimestampEvaluation[];
}

export const TimestampStatus: React.FC<TimestampStatusProps> = ({ timestamps }) => {
  if (!timestamps || timestamps.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 text-center border-slate-800">
        <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
        <h4 className="text-sm font-semibold text-slate-300">No Standard Timestamps Found</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          This JWT payload does not contain standard RFC 7519 time claims (<code>exp</code>, <code>nbf</code>, or <code>iat</code>).
        </p>
      </div>
    );
  }

  const getStatusIcon = (status: TimestampEvaluation['status']) => {
    switch (status) {
      case 'valid':
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'expired':
      case 'invalid':
        return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'future':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'issued':
      default:
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  const getBadgeStyle = (badgeColor: TimestampEvaluation['badgeColor']) => {
    switch (badgeColor) {
      case 'green':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'red':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'yellow':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'blue':
      default:
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Timestamp Validation & Expiration
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Live Evaluation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {timestamps.map((t) => (
          <div
            key={t.claim}
            className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-teal-300 bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-500/30">
                    {t.claim}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{t.label}</span>
                </div>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${getBadgeStyle(
                    t.badgeColor,
                  )}`}
                >
                  {getStatusIcon(t.status)}
                  <span className="capitalize">{t.status}</span>
                </span>
              </div>

              {/* Relative Status Callout */}
              <div className="my-2.5 p-2 rounded bg-slate-950/70 border border-slate-800/80">
                <p className="text-xs font-semibold text-slate-200">{t.relativeText}</p>
              </div>

              {/* Local Date & Time */}
              <div className="space-y-1 mt-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium truncate">{t.localDate}</span>
                </div>
                <div className="font-mono text-[11px] text-slate-500 truncate" title={t.isoDate}>
                  ISO: {t.isoDate}
                </div>
              </div>
            </div>

            {/* Raw Timestamp */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Unix Epoch:</span>
              <span className="text-slate-300">{t.rawTimestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
