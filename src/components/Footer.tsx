import React from 'react';
import { Shield, Lock, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      {/* Security Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Security & Verification Notice</p>
              <p className="text-slate-400 text-[11px] mt-0.5 max-w-3xl leading-relaxed">
                Decoding a JSON Web Token merely reveals its encoded claims and header parameters. It does <strong>not</strong> cryptographically verify authenticity or integrity. Always verify signatures server-side with your private/public keys before trusting token contents.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20">
              <Lock className="w-3 h-3" />
              100% Client-Side Privacy
            </span>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">
              JWT<span className="text-teal-400">Decoder</span>
            </span>
            <span className="text-slate-600">•</span>
            <a
              href="https://himat.tech/free-tools/jwt-decoder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 text-[11px] font-medium transition-colors"
            >
              Live on himat.tech
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px]">
            <a
              href="https://github.com/himat-technology"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/company/himat-technology"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/himat_technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/people/Himat-technology/61593829197445/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors"
            >
              Facebook
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://datatracker.ietf.org/doc/html/rfc7519"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1"
            >
              <span>RFC 7519</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-600 text-[11px] flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>by</span>
          <a
            href="https://himat.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal-400 font-medium transition-colors"
          >
            HiMat Technology
          </a>
        </div>
      </div>
    </footer>
  );
};
