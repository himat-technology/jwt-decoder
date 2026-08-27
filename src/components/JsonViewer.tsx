import React, { useMemo } from 'react';
import { CopyButton } from './CopyButton';
import { AlertCircle, FileCode, CheckCircle2 } from 'lucide-react';

interface JsonViewerProps {
  title: string;
  subtitle?: string;
  jsonString: string;
  rawBase64?: string;
  isValid: boolean;
  error?: string;
  variant: 'header' | 'payload' | 'signature';
  badgeText?: string;
  charCount?: number;
  byteLength?: number;
}

/**
 * Highlights a formatted JSON string with syntax-colored tokens
 */
function highlightJson(json: string, variant: 'header' | 'payload' | 'signature'): string {
  if (!json) return '';

  // Escape HTML entities to prevent XSS
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const keyColorClass =
    variant === 'header'
      ? 'text-rose-300 font-semibold'
      : variant === 'payload'
        ? 'text-purple-300 font-semibold'
        : 'text-teal-300 font-semibold';

  // Regular expression for tokenizing JSON
  const jsonRegex =
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

  return escaped.replace(jsonRegex, (match) => {
    let cls = 'text-amber-300'; // default string

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = keyColorClass; // key
      } else {
        cls = 'text-emerald-300'; // string value
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-pink-400 font-medium'; // boolean
    } else if (/null/.test(match)) {
      cls = 'text-slate-400 italic'; // null
    } else if (!isNaN(Number(match))) {
      cls = 'text-cyan-300 font-mono'; // number
    }

    return `<span class="${cls}">${match}</span>`;
  });
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  title,
  subtitle,
  jsonString,
  isValid,
  error,
  variant,
  badgeText,
  charCount,
  byteLength,
}) => {
  const lineCount = useMemo(() => {
    if (!jsonString) return 0;
    return jsonString.split('\n').length;
  }, [jsonString]);

  const highlightedHtml = useMemo(() => {
    return highlightJson(jsonString, variant);
  }, [jsonString, variant]);

  const themeConfig = {
    header: {
      border: 'border-rose-500/20 hover:border-rose-500/35',
      headerBg: 'bg-rose-950/30 border-b border-rose-500/20',
      badge: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      dot: 'bg-rose-400',
      titleColor: 'text-rose-200',
      lineGutter: 'text-rose-400/40 border-r border-rose-500/10',
    },
    payload: {
      border: 'border-purple-500/20 hover:border-purple-500/35',
      headerBg: 'bg-purple-950/30 border-b border-purple-500/20',
      badge: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
      dot: 'bg-purple-400',
      titleColor: 'text-purple-200',
      lineGutter: 'text-purple-400/40 border-r border-purple-500/10',
    },
    signature: {
      border: 'border-teal-500/20 hover:border-teal-500/35',
      headerBg: 'bg-teal-950/30 border-b border-teal-500/20',
      badge: 'bg-teal-500/15 text-teal-300 border border-teal-500/30',
      dot: 'bg-teal-400',
      titleColor: 'text-teal-200',
      lineGutter: 'text-teal-400/40 border-r border-teal-500/10',
    },
  }[variant];

  return (
    <div
      className={`glass-card rounded-xl overflow-hidden transition-all duration-200 flex flex-col h-full ${themeConfig.border}`}
    >
      {/* Panel Header */}
      <div className={`px-4 py-3 flex items-center justify-between gap-3 ${themeConfig.headerBg}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full ${themeConfig.dot} animate-pulse`} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`text-sm font-semibold tracking-wide ${themeConfig.titleColor}`}>
                {title}
              </h3>
              {badgeText && (
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-medium ${themeConfig.badge}`}>
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-400 truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {charCount !== undefined && byteLength !== undefined && charCount > 0 && (
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              {byteLength} B
            </span>
          )}
          {isValid && jsonString && (
            <CopyButton text={jsonString} label="Copy JSON" title={`Copy ${title} JSON`} />
          )}
        </div>
      </div>

      {/* Panel Body */}
      <div className="relative flex-1 bg-slate-950/80 min-h-[220px] max-h-[460px] overflow-auto">
        {error ? (
          <div className="p-4">
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg flex items-start gap-2.5 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Decoding Error</p>
                <p className="mt-0.5 text-red-300/90">{error}</p>
              </div>
            </div>
            {jsonString && (
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-1 font-mono">Raw decoded content:</p>
                <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-slate-300 whitespace-pre-wrap break-all">
                  {jsonString}
                </pre>
              </div>
            )}
          </div>
        ) : !jsonString ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500">
            <FileCode className="w-10 h-10 mb-2 stroke-1 opacity-50 text-slate-400" />
            <p className="text-sm font-medium text-slate-400">No token provided</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Paste a valid JWT or load a sample above to inspect the decoded {title.toLowerCase()}.
            </p>
          </div>
        ) : (
          <div className="flex text-xs font-mono">
            {/* Line numbers */}
            <div
              className={`select-none py-3 px-3 text-right bg-slate-950/90 ${themeConfig.lineGutter}`}
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} className="leading-5">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code content */}
            <div className="flex-1 py-3 px-4 overflow-x-auto">
              <pre
                className="leading-5 font-mono text-slate-200"
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer validation status bar */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          {isValid ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Valid JSON Object</span>
            </>
          ) : error ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-red-300 font-medium">Invalid {title}</span>
            </>
          ) : (
            <span>Awaiting input</span>
          )}
        </div>
        {isValid && (
          <span className="text-slate-500 font-mono">
            {lineCount} line{lineCount === 1 ? '' : 's'}
          </span>
        )}
      </div>
    </div>
  );
};
