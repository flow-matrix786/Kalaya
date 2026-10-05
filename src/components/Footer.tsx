import React from 'react';
import { Bot, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { AGENCY_INFO, OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface FooterProps {
  onOpenOrder: () => void;
  onOpenPayment: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOrder,
  onOpenPayment,
  onOpenTracker,
}) => {
  return (
    <footer className="bg-[#080B12] border-t border-white/10 text-gray-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[1.5px]">
                <div className="w-full h-full bg-[#080B12] rounded-[6px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="font-bold text-base text-white tracking-tight">Agentify-360</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI Automation Agency engineering custom Instagram DM chatbots for creators, boutique brands, and businesses.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Registered Account Channel</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Service Tiers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Starter ($150) — Text DMs
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Standard ($350) — + Voice Notes
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pro ($600) — + Image OCR
                </a>
              </li>
              <li>
                <span className="text-amber-400 text-[11px]">Upgrade anytime</span>
              </li>
            </ul>
          </div>

          {/* Official Bank Account */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Authorized Payment Info</h4>
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px]">
              <p className="text-white font-semibold">{OFFICIAL_PAYMENT_DETAILS.bank}</p>
              <p className="text-emerald-300 font-mono">{OFFICIAL_PAYMENT_DETAILS.accountTitle}</p>
              <p className="text-gray-300 font-mono">{OFFICIAL_PAYMENT_DETAILS.accountNo}</p>
              <button
                onClick={onOpenPayment}
                className="text-pink-400 hover:text-pink-300 underline font-semibold mt-1 block cursor-pointer"
              >
                View Full Bank & IBAN
              </button>
            </div>
          </div>

          {/* Agency Actions */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Agency Actions</h4>
            <button
              onClick={() => onOpenOrder()}
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:opacity-95 transition-opacity text-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Build Custom Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenTracker}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors text-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Track Order (AG360)</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} Agentify-360. All rights reserved. Meta Graph API Compliant.</p>
          <p className="flex items-center gap-1">
            Built for high-converting Instagram DM automation
          </p>
        </div>
      </div>
    </footer>
  );
};
