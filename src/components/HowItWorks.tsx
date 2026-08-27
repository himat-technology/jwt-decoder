import React from 'react';
import { ClipboardCheck, SearchCode, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Paste Your JWT Token',
      icon: ClipboardCheck,
      color: 'from-rose-500 to-pink-500',
      description:
        'Paste any standard Base64Url-encoded JSON Web Token directly into the input area, or click "Load Sample" to instantly populate a demonstration token.',
    },
    {
      number: '02',
      title: 'Instant Local Inspection',
      icon: SearchCode,
      color: 'from-purple-500 to-indigo-500',
      description:
        'The browser instantly splits the token into Header, Payload, and Signature. It decodes Base64Url sections and parses JSON in-memory with zero network overhead.',
    },
    {
      number: '03',
      title: 'Validate & Copy Claims',
      icon: CheckCircle,
      color: 'from-teal-500 to-emerald-500',
      description:
        'Inspect standard and custom claims, check live expiration and not-before statuses, and copy formatted JSON output with a single click.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How to Decode JWT Tokens in 3 Simple Steps
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            A frictionless, instantaneous workflow designed for developers and security engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl p-6 border-slate-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${s.color} p-0.5 shadow-md`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-800 font-mono select-none">
                      {s.number}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-100 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
