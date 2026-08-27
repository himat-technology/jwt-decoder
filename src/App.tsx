import React from 'react';
import { Header } from './components/Header';
import { JwtInput } from './components/JwtInput';
import { TokenStructure } from './components/TokenStructure';
import { JsonViewer } from './components/JsonViewer';
import { TimestampStatus } from './components/TimestampStatus';
import { ClaimInspector } from './components/ClaimInspector';
import { HowItWorks } from './components/HowItWorks';
import { FeatureSection } from './components/FeatureSection';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CopyButton } from './components/CopyButton';
import { useJwtDecoder } from './hooks/useJwtDecoder';
import {
  ShieldAlert,
  Sparkles,
  Info,
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    token,
    setToken,
    decodedResult,
    loadSample,
    clearToken,
  } = useJwtDecoder();

  const { header, payload, signature, status, timestamps, claims } = decodedResult;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500/25 selection:text-teal-200">
      {/* Navbar */}
      <Header />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-teal-500/5 blur-3xl pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Client-Side Decoding & Zero Network Storage</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              JWT Decoder &amp; Inspector <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">Online</span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Decode JSON Web Tokens, inspect header algorithms and payload claims, validate expiration timestamps, and debug authentication tokens directly in your browser.
            </p>
          </div>
        </section>

        {/* Main Tool Section */}
        <section id="decoder" className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* JWT Input Box */}
            <JwtInput
              token={token}
              setToken={setToken}
              decodedResult={decodedResult}
              loadSample={loadSample}
              clearToken={clearToken}
            />

            {/* Encoded Token Visual Structure */}
            {token && status.errorType !== 'EMPTY' && (
              <TokenStructure decodedResult={decodedResult} />
            )}

            {/* Decoded Header and Payload Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Header Panel */}
              <JsonViewer
                title="Decoded Header"
                subtitle="Algorithm & Token Metadata"
                jsonString={header.formattedJson}
                rawBase64={header.raw}
                isValid={header.isValid}
                error={header.error}
                variant="header"
                badgeText={header.decoded?.alg || 'HEADER'}
                charCount={header.charCount}
                byteLength={header.byteLength}
              />

              {/* Payload Panel */}
              <JsonViewer
                title="Decoded Payload"
                subtitle="User Claims & Data"
                jsonString={payload.formattedJson}
                rawBase64={payload.raw}
                isValid={payload.isValid}
                error={payload.error}
                variant="payload"
                badgeText={`${claims.length} Claims`}
                charCount={payload.charCount}
                byteLength={payload.byteLength}
              />
            </div>

            {/* Signature Section */}
            <div className="glass-card rounded-xl p-5 border-teal-500/20 glow-signature">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                  <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wide">
                    Token Signature
                  </h3>
                  <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                    {header.decoded?.alg || 'Signature'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {signature.raw && (
                    <CopyButton text={signature.raw} label="Copy Signature" size="sm" />
                  )}
                </div>
              </div>

              {/* Signature Display */}
              {signature.raw ? (
                <div className="p-3.5 bg-slate-950/90 rounded-lg border border-slate-800 font-mono text-xs text-teal-300 break-all leading-relaxed select-all">
                  {signature.raw}
                </div>
              ) : (
                <div className="p-4 bg-slate-950/60 rounded-lg border border-slate-800 text-center text-xs text-slate-500 italic">
                  No signature segment found in the token.
                </div>
              )}

              {/* Security & Verification Explanation */}
              <div className="mt-4 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-200">
                      Why is the signature not decoded into JSON?
                    </p>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      The signature is a binary cryptographic digest produced by encrypting or hashing the Header and Payload with a secret or private key. It does not contain JSON data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/80">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-300">
                      Signature Verification vs. Token Decoding
                    </p>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Decoding a JWT reveals what is stored inside the token, but does not prove its authenticity. Cryptographic verification requires validating against your application&apos;s secret key (for symmetric algorithms like HS256) or public key / JWKS endpoint (for asymmetric algorithms like RS256 or ES256).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamp Status & Expiration */}
            {payload.decoded && (
              <TimestampStatus timestamps={timestamps} />
            )}

            {/* Claims Inspector */}
            {payload.decoded && claims.length > 0 && (
              <ClaimInspector claims={claims} />
            )}

          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Features Section */}
        <FeatureSection />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
