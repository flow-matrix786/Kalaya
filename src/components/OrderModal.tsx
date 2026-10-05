import React, { useState } from 'react';
import { X, Check, Copy, AlertCircle, ArrowRight, ShieldCheck, Building2, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { PackageTier, OrderRecord } from '../types';
import { PACKAGES, OFFICIAL_PAYMENT_DETAILS } from '../data/agencyData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: PackageTier;
  onCreateOrder: (order: OrderRecord) => void;
  onOpenPayment: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedTier = 'standard',
  onCreateOrder,
  onOpenPayment,
}) => {
  const [selectedTier, setSelectedTier] = useState<PackageTier>(preselectedTier);
  const [customerName, setCustomerName] = useState('');
  const [instagramName, setInstagramName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [notes, setNotes] = useState('');
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [proofUploaded, setProofUploaded] = useState(false);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedTier) || PACKAGES[1];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !instagramHandle) return;

    // Generate Order Number: AG360-[5 random digits]
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AG360-${randomDigits}`;

    const newOrder: OrderRecord = {
      orderNumber,
      customerName: customerName.trim(),
      instagramName: (instagramName.trim() || customerName.trim()),
      instagramHandle: instagramHandle.trim().startsWith('@') ? instagramHandle.trim() : `@${instagramHandle.trim()}`,
      packageTier: selectedTier,
      packageName: `${currentPkg.name} ($${currentPkg.price})`,
      amount: currentPkg.price,
      notes: notes.trim() || 'Standard package build with default FAQ flows.',
      status: 'PENDING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      paymentConfirmationNote: 'Order created. Awaiting transfer to official Meezan Bank account.',
    };

    onCreateOrder(newOrder);
    setCreatedOrder(newOrder);
  };

  const handleSimulateProof = () => {
    if (!createdOrder) return;
    const updated: OrderRecord = {
      ...createdOrder,
      status: 'UNPAID CONFIRMED',
      lastUpdated: 'Just now',
      paymentConfirmationNote:
        'Payment screenshot received (matched to SAIF UR REHMAN AKHTAR / Meezan Bank). Manual team verification in progress.',
    };
    onCreateOrder(updated);
    setCreatedOrder(updated);
    setProofUploaded(true);
  };

  const handleResetAndClose = () => {
    setCreatedOrder(null);
    setProofUploaded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121824] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-white">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdOrder ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                OFFICIAL ORDER FORM
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Order Your Custom Instagram DM Agent
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Your order will be registered in our Google Sheets CRM with an official <span className="font-mono text-gray-300">AG360-XXXXX</span> ID.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  1. Select Package Tier:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTier(pkg.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedTier === pkg.id
                          ? 'bg-gradient-to-b from-[#1F283C] to-[#161D2C] border-pink-500 shadow-md shadow-pink-500/20 ring-1 ring-pink-500'
                          : 'bg-[#151C2C] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{pkg.name.replace(' Tier', '')}</span>
                        {selectedTier === pkg.id && (
                          <div className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-base font-extrabold text-pink-400 font-mono mt-1">${pkg.price}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 truncate">{pkg.tagline}</p>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-400 mt-1.5 flex items-center gap-1 font-medium">
                  <span>💡 You can start with Starter ($150) and upgrade to Voice or Vision later!</span>
                </p>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Full Name: <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Saif Rehman"
                    className="w-full bg-[#182132] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Instagram Handle / Profile Link: <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    placeholder="e.g. @yourbrand or instagram.com/brand"
                    className="w-full bg-[#182132] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Brand / Business Name:
                  </label>
                  <input
                    type="text"
                    value={instagramName}
                    onChange={(e) => setInstagramName(e.target.value)}
                    placeholder="e.g. Velvet Luxe Apparel"
                    className="w-full bg-[#182132] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Order Price Summary:
                  </label>
                  <div className="w-full bg-[#182132] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm font-mono text-emerald-400 font-bold flex items-center justify-between">
                    <span>{currentPkg.name}</span>
                    <span>${currentPkg.price} USD</span>
                  </div>
                </div>
              </div>

              {/* Customization notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Customization Notes & FAQs:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Clothing brand with 50 products. Want bot to collect phone numbers and reply in friendly Urdu/English tone."
                  className="w-full bg-[#182132] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-pink-500"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-lg shadow-pink-500/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Order & Generate AG360 ID</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation View */
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Order Successfully Registered
              </span>
              <h3 className="text-3xl font-extrabold text-white font-mono mt-1">
                {createdOrder.orderNumber}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Logged to Google Sheets CRM · Current Status: <strong className="text-amber-400 font-mono">{createdOrder.status}</strong>
              </p>
            </div>

            {/* Official Payment Account Card */}
            <div className="p-5 rounded-2xl bg-[#172030] border-2 border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Transfer Exactly ${createdOrder.amount} USD to Official Account:</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Meezan Bank
                </span>
              </div>

              {/* Fields */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1522] border border-white/5">
                  <span className="text-gray-400">Account Title:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-300">{OFFICIAL_PAYMENT_DETAILS.accountTitle}</span>
                    <button
                      onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountTitle, 'modal_title')}
                      className="p-1 rounded bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                    >
                      {copiedField === 'modal_title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1522] border border-white/5">
                  <span className="text-gray-400">Account No:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white tracking-wider">{OFFICIAL_PAYMENT_DETAILS.accountNo}</span>
                    <button
                      onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.accountNo, 'modal_acc')}
                      className="p-1 rounded bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                    >
                      {copiedField === 'modal_acc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1522] border border-white/5">
                  <span className="text-gray-400">IBAN:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-300 text-[11px]">{OFFICIAL_PAYMENT_DETAILS.iban}</span>
                    <button
                      onClick={() => handleCopy(OFFICIAL_PAYMENT_DETAILS.iban, 'modal_iban')}
                      className="p-1 rounded bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                    >
                      {copiedField === 'modal_iban' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof Upload Simulation */}
            {!proofUploaded ? (
              <div className="p-4 rounded-2xl bg-[#192233] border border-white/10 space-y-3 text-xs">
                <p className="font-bold text-white">Have you transferred the funds?</p>
                <p className="text-gray-300">
                  Upload or simulate your payment screenshot. Our system will mark your order as <span className="text-amber-400 font-semibold font-mono">UNPAID CONFIRMED</span> while the team verifies your bank slip.
                </p>
                <button
                  onClick={handleSimulateProof}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Simulate Payment Proof Screenshot Upload</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Payment Proof Received!</p>
                  <p className="mt-0.5">
                    Order <strong>{createdOrder.orderNumber}</strong> status is now <strong>UNPAID CONFIRMED</strong>. Our team will verify the payment in Meezan Bank and begin your agent setup!
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Done / Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
