import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, AlertTriangle, ArrowRight, Building2, User, CreditCard, Hash, FileCheck2 } from 'lucide-react';
import { OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface PaymentDetailsSectionProps {
  onOpenOrder: () => void;
  onOpenTracker: () => void;
}

export const PaymentDetailsSection: React.FC<PaymentDetailsSectionProps> = ({
  onOpenOrder,
  onOpenTracker,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="payment-details" className="py-24 bg-[#0B0F17] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Payment Channels Only</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Official <span className="text-emerald-400">Payment Information</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            To prevent scams and guarantee your order authentication, all payments for Agentify-360 must be transferred exclusively to our registered official account below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Bank Account Box */}
          <div className="lg:col-span-7 bg-[#121824] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient watermarking */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Building2 className="w-48 h-48 text-emerald-400" />
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Meezan Bank</h3>
                  <p className="text-xs text-gray-400 font-mono">Islamic Banking Branch Network</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                Official Account
              </span>
            </div>

            {/* Account Details Copy Grid */}
            <div className="mt-6 space-y-4">
              {/* Field 1: Bank Name */}
              <div className="p-4 rounded-2xl bg-[#192233] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400">Bank Name</p>
                    <p className="text-base font-bold text-white">{OFFICIAL_PAYMENT_DETAILS.bank}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.bank, 'bank')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'bank' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Field 2: Account Title */}
              <div className="p-4 rounded-2xl bg-[#192233] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400">Account Title (Beneficiary)</p>
                    <p className="text-base font-bold text-emerald-300 tracking-wide font-mono">
                      {OFFICIAL_PAYMENT_DETAILS.accountTitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountTitle, 'title')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'title' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Field 3: Account Number */}
              <div className="p-4 rounded-2xl bg-[#192233] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400">Account Number</p>
                    <p className="text-lg font-extrabold text-white font-mono tracking-wider">
                      {OFFICIAL_PAYMENT_DETAILS.accountNo}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountNo, 'acc')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Field 4: IBAN */}
              <div className="p-4 rounded-2xl bg-[#192233] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[11px] font-mono uppercase text-gray-400">IBAN (International / Raast Transfer)</p>
                    <p className="text-sm sm:text-base font-bold text-amber-300 font-mono tracking-wider break-all">
                      {OFFICIAL_PAYMENT_DETAILS.iban}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.iban, 'iban')}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'iban' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Crucial Security Disclaimer */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Strict Security Policy:</strong> Agentify-360 never asks for payment on any personal bank or crypto wallet not listed above. Always ensure the recipient title says <strong>SAIF UR REHMAN AKHTAR</strong> on your banking app before confirming the transfer.
              </p>
            </div>
          </div>

          {/* Right Column: 4-Step Verification Workflow */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121824] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2">How Order Verification Works</h3>
              <p className="text-xs text-gray-400 mb-6">
                Our automated workflow protects your payment and keeps you updated at each milestone.
              </p>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {/* Step 1 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-pink-500 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Create Order & Get AG360 ID</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Submit your package choice and Instagram handle. Your order is registered in our database with status <span className="font-mono text-gray-300">PENDING</span>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Transfer to Meezan Bank</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Transfer exact package amount ($150, $350, or $600) to account title <strong>SAIF UR REHMAN AKHTAR</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Submit Transfer Screenshot</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Upload receipt via our website or DM it. Our AI confirms recipient details & marks status to <span className="font-mono text-amber-400 font-semibold">UNPAID CONFIRMED</span>.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Manual Team Confirmation & Build</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Our human financial controller verifies receipt against bank records. Once verified, build starts within 24 hours!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenOrder}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] font-bold text-xs text-white text-center hover:opacity-95 transition-opacity cursor-pointer"
                >
                  Create New Order
                </button>
                <button
                  onClick={onOpenTracker}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 text-center transition-colors cursor-pointer"
                >
                  Check Order Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
