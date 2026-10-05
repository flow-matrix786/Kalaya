import React, { useState } from 'react';
import { ArrowRight, Bot, Sparkles, Mic, Image as ImageIcon, FileSpreadsheet, CheckCircle2, ShieldCheck, Play, Send } from 'lucide-react';
import { OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface HeroProps {
  onOpenOrder: (tier?: 'starter' | 'standard' | 'pro') => void;
  onOpenSimulator: () => void;
  onOpenPayment: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOrder,
  onOpenSimulator,
  onOpenPayment,
}) => {
  // Mini interactive DM widget in hero
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'image'>('text');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/15 via-pink-600/15 to-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agentify-360 AI Automation Agency</span>
              <span className="text-gray-500">·</span>
              <span className="text-pink-400 font-semibold">Instagram DM Specialists</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Turn Your Instagram DMs Into a{' '}
              <span className="ig-gradient-text">24/7 Revenue Engine</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We build custom, human-like AI agents for creators & businesses. Auto-replies in text,
              listens & responds to voice notes, analyzes payment receipts, and logs orders straight to Google Sheets.
            </p>

            {/* Quick 3-Tier Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161D2C] border border-white/10 text-xs text-gray-200">
                <span className="font-bold text-white">Starter</span>
                <span className="text-gray-400">·</span>
                <span className="text-pink-400 font-mono font-semibold">$150</span>
                <span className="text-gray-400 text-[11px]">(Text DMs)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161D2C] border border-pink-500/30 text-xs text-gray-200">
                <span className="font-bold text-white">Standard</span>
                <span className="text-gray-400">·</span>
                <span className="text-pink-400 font-mono font-semibold">$350</span>
                <span className="text-gray-400 text-[11px]">(+ Voice Notes)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161D2C] border border-purple-500/30 text-xs text-gray-200">
                <span className="font-bold text-white">Pro</span>
                <span className="text-gray-400">·</span>
                <span className="text-pink-400 font-mono font-semibold">$600</span>
                <span className="text-gray-400 text-[11px]">(+ Image Vision)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onOpenOrder()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-base"
              >
                <span>Order Custom DM Agent</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#simulator"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Try Live Demo Below</span>
              </a>
            </div>

            {/* Trust guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Start at any tier, upgrade later</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Auto-logs to Google Sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Official Meezan Bank account</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Instagram DM Mockup Phone */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[380px] rounded-[36px] bg-[#10141E] border-[3px] border-white/15 p-3.5 shadow-2xl card-glow relative">
              {/* Phone Notch */}
              <div className="w-28 h-4 bg-black/80 rounded-full mx-auto mb-2" />

              {/* Instagram Direct Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 px-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px]">
                      <div className="w-full h-full bg-[#10141E] rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#10141E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-white">agentify.360</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">✓</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Active now · Instagram AI Agent</p>
                  </div>
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  LIVE DEMO
                </div>
              </div>

              {/* Demo Mode Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 my-3 bg-[#0B0F17] p-1 rounded-xl text-[11px] font-medium text-gray-400">
                <button
                  onClick={() => setActiveTab('text')}
                  className={`py-1 rounded-lg transition-all ${
                    activeTab === 'text' ? 'bg-[#1C2333] text-white font-semibold shadow' : 'hover:text-gray-200'
                  }`}
                >
                  Starter ($150)
                </button>
                <button
                  onClick={() => setActiveTab('voice')}
                  className={`py-1 rounded-lg transition-all ${
                    activeTab === 'voice' ? 'bg-[#1C2333] text-white font-semibold shadow' : 'hover:text-gray-200'
                  }`}
                >
                  Voice ($350)
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`py-1 rounded-lg transition-all ${
                    activeTab === 'image' ? 'bg-[#1C2333] text-white font-semibold shadow' : 'hover:text-gray-200'
                  }`}
                >
                  Vision ($600)
                </button>
              </div>

              {/* Simulated Chat Feed */}
              <div className="space-y-3 min-h-[300px] flex flex-col justify-end text-xs p-1">
                {activeTab === 'text' && (
                  <>
                    <div className="self-end bg-[#374151] text-white px-3.5 py-2 rounded-2xl rounded-tr-none max-w-[85%]">
                      Hey! How much does an Instagram bot cost for my apparel brand?
                    </div>
                    <div className="self-start bg-[#1F293D] border border-white/10 text-gray-200 px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[90%] space-y-1.5">
                      <p>
                        Hey there! 🚀 We have 3 flexible tiers at <strong>Agentify-360</strong>:
                      </p>
                      <p>• <strong>Starter ($150)</strong>: Text-only DM auto-replies 24/7</p>
                      <p>• <strong>Standard ($350)</strong>: Adds Voice Note listening & reply</p>
                      <p>• <strong>Pro ($600)</strong>: Adds Image & payment receipt OCR</p>
                      <p className="text-[10px] text-pink-400 font-medium">You can start at any tier and upgrade later!</p>
                    </div>
                  </>
                )}

                {activeTab === 'voice' && (
                  <>
                    <div className="self-end bg-[#374151] text-white px-3.5 py-2 rounded-2xl rounded-tr-none max-w-[85%] flex items-center gap-2">
                      <Mic className="w-4 h-4 text-pink-400 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-3 bg-pink-400 rounded-full animate-pulse" />
                          <span className="w-1 h-5 bg-pink-400 rounded-full" />
                          <span className="w-1 h-2 bg-pink-400 rounded-full" />
                          <span className="w-1 h-4 bg-pink-400 rounded-full animate-pulse" />
                          <span className="w-1 h-2 bg-pink-400 rounded-full" />
                          <span className="text-[10px] text-gray-300 ml-1">0:14 Voice Note</span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic">"Can the bot handle audio notes from clients?"</p>
                      </div>
                    </div>
                    <div className="self-start bg-[#1F293D] border border-white/10 text-gray-200 px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[90%] space-y-2">
                      <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-xl">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-7 h-7 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white"
                        >
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </button>
                        <div>
                          <p className="font-semibold text-white text-[11px]">AI Voice Response (0:18)</p>
                          <p className="text-[9px] text-gray-400">Synthesized brand voice</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-[11px]">
                        "Yes! The Standard ($350) and Pro ($600) tiers transcribe follower voice notes in seconds and reply back automatically."
                      </p>
                    </div>
                  </>
                )}

                {activeTab === 'image' && (
                  <>
                    <div className="self-end bg-[#374151] text-white p-2 rounded-2xl rounded-tr-none max-w-[85%] space-y-1.5">
                      <div className="bg-[#1C2333] rounded-lg p-2 border border-white/10 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-[11px] truncate">Meezan_Transfer_Receipt.jpg</span>
                      </div>
                      <p className="text-[11px]">I have transferred $600 to Saif Ur Rehman. Please check!</p>
                    </div>
                    <div className="self-start bg-[#1F293D] border border-white/10 text-gray-200 px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[90%] space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Screenshot OCR Verified</span>
                      </div>
                      <p className="text-[11px]">
                        Recipient: <strong>SAIF UR REHMAN AKHTAR</strong><br />
                        Account: <strong>76010111536310 (Meezan Bank)</strong><br />
                        Status: <span className="text-amber-400 font-semibold">UNPAID CONFIRMED</span>
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Order logged! Team will verify in bank account and confirm build.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Fake message input */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Tap any tier above to test live preview..."
                  className="w-full bg-[#0B0F17] rounded-full px-3.5 py-2 text-[11px] text-gray-500 border border-white/5 outline-none cursor-default"
                />
                <button
                  onClick={() => onOpenOrder()}
                  className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white shrink-0 hover:bg-pink-600 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
