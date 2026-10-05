import React from 'react';
import { Bot, Mic, Eye, FileSpreadsheet, ShieldAlert, Clock, Sparkles, Zap, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const capabilities = [
    {
      icon: <Bot className="w-6 h-6 text-pink-400" />,
      title: 'Human-Tuned DM Conversations',
      description:
        'Never sounds like a robotic auto-responder. Calibrated to match your slang, tone, and brand persona so your followers feel like they are speaking to you.',
      tag: 'Starter + All Tiers',
    },
    {
      icon: <Mic className="w-6 h-6 text-purple-400" />,
      title: 'Audio Voice Note Transcription & Reply',
      description:
        'Over 40% of Instagram users prefer sending voice notes. Our Standard ($350) and Pro ($600) agents transcribe audio instantly and can reply in voice.',
      tag: 'Standard & Pro',
    },
    {
      icon: <Eye className="w-6 h-6 text-emerald-400" />,
      title: 'Payment Receipt & Screenshot OCR',
      description:
        'Analyzes transfer slips in real-time, extracts beneficiary title (SAIF UR REHMAN AKHTAR), account number, and amount, preventing fraudulent submissions.',
      tag: 'Pro Tier ($600)',
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-blue-400" />,
      title: 'Live Google Sheets CRM Sync',
      description:
        'Every lead, customer contact, package order, and payment status syncs automatically to your private Google Sheets spreadsheet with timestamp logs.',
      tag: 'All Tiers Included',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: 'Sub-2-Second Instant Responses',
      description:
        'Captures hot leads when intent is at its highest. While your competitors are asleep, your agent is qualifying buyers and closing orders.',
      tag: '24/7 Availability',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      title: 'Meta API Compliant & Anti-Ban Safe',
      description:
        'Built strictly using official Meta Graph APIs with human typing intervals, keeping your account 100% secure from action blocks or shadowbans.',
      tag: 'Safety First',
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0D121D] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
            <Zap className="w-3.5 h-3.5 text-pink-400" />
            <span>Engineered for Conversions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Creators & Brands <span className="ig-gradient-text">Choose Agentify-360</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Stop losing leads to an overflowing Instagram inbox. We build the most advanced DM agents in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121824] border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
