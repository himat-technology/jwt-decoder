import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export const FAQ: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqs: FaqItem[] = [
    {
      question: 'Is my JWT token uploaded to a server or external API?',
      answer: (
        <p>
          <strong>No, absolutely not.</strong> All token decoding, Base64Url string conversions, UTF-8 parsing, and validation occur <strong>100% locally inside your web browser</strong>. No token data, claims, or headers are ever sent across the network or stored in any remote database. You can even disconnect your internet or use this tool offline.
        </p>
      ),
    },
    {
      question: 'Can this tool verify JWT cryptographic signatures?',
      answer: (
        <div>
          <p>
            <strong>Decoding a token is distinct from cryptographic signature verification.</strong>
          </p>
          <p className="mt-2">
            This tool decodes and inspects the token structure and its JSON claims. Signature verification requires validating the signature against the token header and payload using either a shared secret (for HMAC) or a public key / JWKS certificate (for RSA/ECDSA). Because decoding is client-side and unauthenticated, tokens are explicitly marked as <code className="text-amber-400">Signature Not Verified</code>.
          </p>
        </div>
      ),
    },
    {
      question: 'What JWT signing algorithms are supported for decoding?',
      answer: (
        <div>
          <p>
            Because decoding a standard Base64Url token structure does not require the private signing key, this tool can decode standard JWTs signed with <strong>all standard RFC 7518 JWS algorithms</strong>, including:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 font-mono text-xs text-teal-300">
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• HS256</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• HS384</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• HS512</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• RS256</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• RS384</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• RS512</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• ES256</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• ES384</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• ES512</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• PS256</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• PS384</li>
            <li className="bg-slate-900 px-2 py-1 rounded border border-slate-800">• PS512 / EdDSA</li>
          </ul>
        </div>
      ),
    },
    {
      question: 'How does real-time expiration validation work?',
      answer: (
        <p>
          The application checks the <code className="text-teal-300">exp</code> (Expiration Time), <code className="text-teal-300">nbf</code> (Not Before), and <code className="text-teal-300">iat</code> (Issued At) timestamp claims in the decoded payload. It converts the Unix epoch timestamps to your local timezone and continuously calculates the relative difference against the current clock, updating statuses automatically without page refreshes.
        </p>
      ),
    },
    {
      question: 'Is this tool completely free to use?',
      answer: (
        <p>
          Yes! The tool is completely free, open-source, and does not require registration, subscription, or API keys.
        </p>
      ),
    },
  ];

  return (
    <section id="faq" className="py-16 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Common Questions & Security Principles
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Learn more about how client-side JWT decoding operates and best security practices.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="glass-card rounded-xl border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-slate-100 hover:text-teal-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
