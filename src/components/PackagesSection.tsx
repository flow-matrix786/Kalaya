import React from 'react';
import { Check, ArrowRight, Sparkles, Mic, Eye, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import { PACKAGES } from '../data/agencyData';
import { PackageTier } from '../types';

interface PackagesSectionProps {
  onSelectTier: (tier: PackageTier) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-24 bg-[#0D121D] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-pink-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Agency Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Simple Tiers. <span className="ig-gradient-text">Zero Hidden Costs.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Choose the level of intelligence your Instagram audience deserves.
            <br />
            <strong className="text-amber-400 font-semibold">
              You can start at any tier and seamlessly upgrade later anytime!
            </strong>
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isStandard = pkg.id === 'standard';
            const isPro = pkg.id === 'pro';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isStandard
                    ? 'bg-gradient-to-b from-[#1E2638] to-[#141A28] border-2 border-pink-500/50 shadow-2xl shadow-pink-500/15 -translate-y-2'
                    : 'bg-[#121824] border border-white/10 hover:border-white/20 hover:-translate-y-1'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-extrabold tracking-wider uppercase shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Tier Title & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {pkg.id === 'starter' && <MessageSquare className="w-5 h-5 text-gray-400" />}
                      {pkg.id === 'standard' && <Mic className="w-5 h-5 text-pink-400" />}
                      {pkg.id === 'pro' && <Eye className="w-5 h-5 text-purple-400" />}
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    </div>
                    {isPro && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        VISION AI
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 min-h-[32px]">{pkg.tagline}</p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {pkg.priceFormatted}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">USD one-time</span>
                    </div>
                    <p className="text-xs text-pink-400 font-mono mt-1">{pkg.breakdown}</p>
                  </div>

                  {/* Best for */}
                  <div className="mb-6 p-3 rounded-xl bg-black/30 border border-white/5">
                    <p className="text-xs text-gray-300">
                      <strong className="text-white">Best for:</strong> {pkg.bestFor}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Included Capabilities:</p>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <button
                    onClick={() => onSelectTier(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isStandard
                        ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-lg shadow-pink-500/30 hover:opacity-95'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-gray-500 mt-2">
                    Start here · Upgrade to higher tier anytime
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141A28] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">100% Upgrade Flexibility Guaranteed</h4>
              <p className="text-sm text-gray-300">
                Unsure if your audience sends voice messages or receipts? Begin with Starter ($150). You can add Voice ($200) or Vision ($250) at any point without rebuilding your agent.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTier('starter')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/15 transition-all cursor-pointer"
          >
            Start with Starter ($150)
          </button>
        </div>
      </div>
    </section>
  );
};
