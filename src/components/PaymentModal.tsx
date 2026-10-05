import React, { useState } from 'react';
import { X, Copy, Check, Building2, ShieldCheck, AlertTriangle, CreditCard, Hash, User } from 'lucide-react';
import { OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onOpenOrder,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#121824] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Official Bank Account</h3>
            <p className="text-xs text-gray-400 font-mono">Agentify-360 Authorized Payment Channel</p>
          </div>
        </div>

        <div className="space-y-3.5 mb-6 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#182132] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-gray-400 uppercase font-mono text-[10px]">Bank</p>
              <p className="text-sm font-bold text-white">{OFFICIAL_PAYMENT_DETAILS.bank}</p>
            </div>
            <button
              onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.bank, 'bank')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'bank' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#182132] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-gray-400 uppercase font-mono text-[10px]">Account Title</p>
              <p className="text-sm font-bold text-emerald-300 font-mono">{OFFICIAL_PAYMENT_DETAILS.accountTitle}</p>
            </div>
            <button
              onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountTitle, 'title')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'title' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#182132] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-gray-400 uppercase font-mono text-[10px]">Account Number</p>
              <p className="text-base font-extrabold text-white font-mono tracking-wider">
                {OFFICIAL_PAYMENT_DETAILS.accountNo}
              </p>
            </div>
            <button
              onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountNo, 'acc')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#182132] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-gray-400 uppercase font-mono text-[10px]">IBAN</p>
              <p className="text-xs sm:text-sm font-bold text-amber-300 font-mono tracking-wide break-all">
                {OFFICIAL_PAYMENT_DETAILS.iban}
              </p>
            </div>
            <button
              onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.iban, 'iban')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'iban' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5 mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            Never transfer funds to any account not listed above. After completing your transfer, send your screenshot in DM or upload via our Order Tracker to register it as <strong className="text-white">UNPAID CONFIRMED</strong>.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenOrder();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs cursor-pointer hover:opacity-95"
          >
            Create an Agent Order
          </button>
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
