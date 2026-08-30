import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { BotanicalMotif } from './BotanicalMotif';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftCardModal: React.FC<GiftCardModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = [50, 100, 150, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#1C1710] border border-[#C9A44C]/35 rounded-lg shadow-2xl p-6 sm:p-8 text-[#F5EFE3]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-card-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          aria-label="Close gift card dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /> Kalaya Digital Dining Pass
              </span>
              <h3 id="gift-card-title" className="font-display text-2xl sm:text-3xl text-[#E3CAA0] italic mt-1 font-semibold">
                Give the Gift of Celebration
              </h3>
              <BotanicalMotif variant="divider" className="my-2" />
              <p className="text-xs sm:text-sm text-[#C9BFA6] max-w-sm mx-auto">
                Share an unforgettable Southern Thai dining journey. Delivered instantly via email with your custom message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C9A44C] font-medium mb-1.5">
                  Select Gift Amount
                </label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {presetAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded border text-sm font-semibold transition-all ${
                        amount === amt && !customAmount
                          ? 'bg-[#C9A44C] text-[#1C1710] border-[#C9A44C] shadow-md'
                          : 'bg-[#241D13] border-[#C9A44C]/25 text-[#E3DAC9] hover:border-[#C9A44C]'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-[#8A7F65] text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount (e.g. 175)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded pl-7 pr-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Recipient & Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Recipient’s Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Recipient’s Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                  Your Name (Sender) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Taylor Smith"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                  Personalized Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Wishing you the happiest birthday feast and extraordinary curries at Kalaya!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded bg-[#B5502D] hover:bg-[#943F22] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B5502D]/20 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
              >
                <Sparkles className="w-4 h-4 text-[#E3CAA0]" /> Send Digital Gift Card (${finalAmount})
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#2F3B2A] border border-[#C9A44C] text-[#C9A44C] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#E3CAA0]" />
            </div>

            <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.25em] uppercase">
              Gift Card Sent
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#E3CAA0] italic font-semibold">
              Thank You, {senderName}!
            </h3>
            <p className="text-sm text-[#D8CFBC] max-w-sm mx-auto">
              A digital gift card for <strong>${finalAmount}</strong> has been issued and sent directly to <strong>{recipientEmail}</strong> for {recipientName}.
            </p>

            <div className="bg-[#241D13] border border-[#C9A44C]/30 rounded-lg p-4 text-xs text-[#A69B82] max-w-xs mx-auto">
              Never expires · Valid for dine-in dinner, weekend lunch, and curated bottle cellar purchases.
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded bg-[#C9A44C] text-[#1C1710] font-semibold text-xs uppercase tracking-wider hover:bg-[#E3CAA0] transition-colors"
            >
              Back to Restaurant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
