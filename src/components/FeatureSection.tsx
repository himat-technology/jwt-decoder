import React from 'react';
import {
  ShieldCheck,
  Clock,
  Palette,
  Search,
  Copy,
  Zap,
  Globe2,
} from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10 border-teal-500/20',
      title: '100% Browser-Local Decoding',
      description:
        'Zero network requests. All JWT parsing, Base64Url decoding, and JSON formatting occur purely in client-side memory.',
    },
    {
      icon: Clock,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
      title: 'Real-Time Expiration & Claim Validation',
      description:
        'Automatically evaluates exp, nbf, and iat timestamps with live-updating relative status (e.g., "Expired 2 hours ago", "Expires in 3 days").',
    },
    {
      icon: Palette,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/20',
      title: 'Color-Coded Token Structure',
      description:
        'Visually distinguishes Header (rose), Payload (purple), and Signature (teal) components with exact byte sizes and character counts.',
    },
    {
      icon: Search,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
      title: 'Interactive Claims Inspector',
      description:
        'Deep-dive into RFC 7519 standard and custom claims with human-readable descriptions, type detection, and real-time search filtering.',
    },
    {
      icon: Copy,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      title: 'Copy Formatted Output',
      description:
        'One-click clipboard actions for formatted Header JSON, Payload JSON, individual claim values, and raw base64 segments.',
    },
    {
      icon: Globe2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Unicode & Multilingual Support',
      description:
        'Robust UTF-8 decoding properly decodes international characters, accented names, Japanese/CJK scripts, and emojis without encoding errors.',
    },
  ];

  return (
    <section id="features" className="py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Developer-First Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Built for Secure, Frictionless JWT Debugging
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Everything you need to inspect, debug, and validate JSON Web Tokens without ever exposing sensitive authentication credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-xl p-6 border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg ${f.bgColor} border flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
