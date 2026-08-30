import React, { useState } from 'react';
import { X, Calendar, Users, Clock, Sparkles, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';
import { BotanicalMotif } from './BotanicalMotif';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPartySize?: number;
  initialDate?: string;
  initialTime?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialPartySize = 2,
  initialDate,
  initialTime,
}) => {
  const [guests, setGuests] = useState<number>(initialPartySize);
  const [date, setDate] = useState<string>(
    initialDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>(initialTime || '6:30 PM');
  const [seating, setSeating] = useState<'Main Dining Hall' | "Chef's Counter" | 'Covered Garden Pergola'>(
    'Main Dining Hall'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietary, setDietary] = useState('');
  const [celebration, setCelebration] = useState('Casual Dining');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:45 PM', '8:15 PM', '8:45 PM', '9:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'KLY-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#1C1710] border border-[#C9A44C]/30 rounded-lg shadow-2xl p-6 sm:p-8 text-[#F5EFE3]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.25em] uppercase">
                Table Reservation
              </span>
              <h3 id="reservation-title" className="font-display text-2xl sm:text-3xl text-[#E3CAA0] italic mt-1 font-semibold">
                Reserve Your Table at Kalaya
              </h3>
              <BotanicalMotif variant="divider" className="my-2" />
              <p className="text-xs sm:text-sm text-[#C9BFA6] max-w-md mx-auto">
                Join us for an unforgettable feast of authentic Southern Thai curries, wok-fired seafood, and celebratory hospitality.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Guests & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C9A44C] font-medium mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Party Size
                  </label>
                  <div className="flex items-center border border-[#C9A44C]/30 rounded bg-[#241D13] p-1">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-1.5 text-xs sm:text-sm rounded font-medium transition-all ${
                          guests === num
                            ? 'bg-[#C9A44C] text-[#1C1710] font-bold shadow-sm'
                            : 'text-[#E3DAC9] hover:bg-white/5'
                        }`}
                      >
                        {num === 8 ? '8+ Guests' : `${num} ${num === 1 ? 'Guest' : 'Guests'}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C9A44C] font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C9A44C] font-medium mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Preferred Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 px-1 text-xs rounded border transition-all text-center ${
                        time === slot
                          ? 'bg-[#B5502D] border-[#B5502D] text-white font-semibold shadow-md'
                          : 'bg-[#241D13] border-[#C9A44C]/25 text-[#E3DAC9] hover:border-[#C9A44C]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Experience */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C9A44C] font-medium mb-1.5">
                  Seating Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'Main Dining Hall', desc: 'Center of energy & celebration' },
                    { id: "Chef's Counter", desc: 'Front-row view of wok & charcoal' },
                    { id: 'Covered Garden Pergola', desc: 'Lush botanicals & skylights' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSeating(item.id as any)}
                      className={`p-2.5 text-left rounded border transition-all ${
                        seating === item.id
                          ? 'bg-[#2F3B2A] border-[#C9A44C] text-[#F5EFE3]'
                          : 'bg-[#241D13] border-[#C9A44C]/20 text-[#A69B82] hover:border-[#C9A44C]/50'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#E3CAA0]">{item.id}</div>
                      <div className="text-[11px] opacity-75 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(215) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Celebration & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Occasion / Celebration
                  </label>
                  <select
                    value={celebration}
                    onChange={(e) => setCelebration(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] focus:border-[#C9A44C] focus:outline-none"
                  >
                    <option>Casual Dining</option>
                    <option>Birthday Celebration</option>
                    <option>Anniversary</option>
                    <option>Business Dinner</option>
                    <option>Special Culinary Journey</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#A69B82] mb-1">
                    Dietary Notes / Allergies
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gluten-free, Shellfish allergy"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-sm text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Policy note */}
              <div className="bg-[#241D13]/80 border border-[#C9A44C]/20 rounded p-3 text-xs text-[#B3A789] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#C9A44C] shrink-0 mt-0.5" />
                <span>
                  <strong>Cancellation Policy:</strong> We hold tables for 15 minutes. For parties of 5+, cancellations within 24 hours are subject to a $25/guest fee.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded bg-[#B5502D] hover:bg-[#943F22] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B5502D]/20 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
              >
                <Sparkles className="w-4 h-4 text-[#E3CAA0]" /> Confirm Reservation Request
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 bg-[#2F3B2A] border border-[#C9A44C] text-[#C9A44C] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#E3CAA0]" />
            </div>

            <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.25em] uppercase">
              Confirmed Booking
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#E3CAA0] italic font-semibold">
              Sawasdee, {name || 'Honored Guest'}!
            </h3>
            <p className="text-sm text-[#D8CFBC] max-w-md mx-auto">
              Your table has been reserved at Kalaya. A confirmation email with calendar invites and dining notes has been dispatched to <strong>{email}</strong>.
            </p>

            <div className="bg-[#241D13] border border-[#C9A44C]/30 rounded-lg p-5 max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#C9A44C]/15 pb-2">
                <span className="text-[#A69B82]">Reservation Code:</span>
                <span className="font-mono text-[#C9A44C] font-bold">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9A44C]/15 pb-2">
                <span className="text-[#A69B82]">Date & Time:</span>
                <span className="text-[#F5EFE3] font-medium">{date} at {time}</span>
              </div>
              <div className="flex justify-between border-b border-[#C9A44C]/15 pb-2">
                <span className="text-[#A69B82]">Party Size & Seating:</span>
                <span className="text-[#F5EFE3] font-medium">{guests} Guests · {seating}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#A69B82]">Location:</span>
                <span className="text-[#F5EFE3] text-right font-medium">4 W. Palmer St, Fishtown, PA</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded bg-[#C9A44C] text-[#1C1710] font-semibold text-xs uppercase tracking-wider hover:bg-[#E3CAA0] transition-colors"
              >
                Done
              </button>
              <a
                href="#menu"
                onClick={onClose}
                className="px-6 py-2.5 rounded border border-[#C9A44C]/50 text-[#E3CAA0] font-medium text-xs uppercase tracking-wider hover:bg-[#C9A44C]/10 transition-colors inline-block"
              >
                Preview Menu Dishes
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
