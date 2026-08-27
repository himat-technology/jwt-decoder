import React from 'react';
import { Shield, Sparkles, Github, Terminal, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                JWT<span className="text-teal-400">Decoder</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                100% Client-Side
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Client-Side Token Inspector & Validator
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a
            href="#decoder"
            className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>Inspector</span>
          </a>
          <a
            href="#how-it-works"
            className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>How It Works</span>
          </a>
          <a href="#features" className="hover:text-teal-400 transition-colors">
            Features
          </a>
          <a href="#faq" className="hover:text-teal-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Button & GitHub */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/himat-technology/jwt-decoder"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="View on GitHub (@himat-technology)"
            aria-label="View on GitHub (@himat-technology)"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
