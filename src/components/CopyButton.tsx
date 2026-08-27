import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md';
  title?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  iconOnly = false,
  size = 'sm',
  title = 'Copy to clipboard',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!text) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for non-secure contexts or legacy browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    },
    [text],
  );

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-1 text-xs gap-1.5 rounded-md'
      : 'px-3 py-1.5 text-sm gap-2 rounded-lg';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      title={title}
      aria-label={title}
      className={`inline-flex items-center font-medium transition-all duration-150 select-none ${
        copied
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
          : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
      } ${sizeClasses} ${className}`}
    >
      {copied ? (
        <>
          <Check className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          {!iconOnly && <span>{copiedLabel}</span>}
        </>
      ) : (
        <>
          <Copy className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          {!iconOnly && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
