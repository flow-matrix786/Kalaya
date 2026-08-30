import React, { useState } from 'react';
import { Calendar, Users, Clock, Sparkles, MapPin } from 'lucide-react';
import { BotanicalMotif } from './BotanicalMotif';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationBannerProps {
  onOpenReservation: (partySize?: number, date?: string, time?: string) => void;
}

export const ReservationBanner: React.FC<ReservationBannerProps> = ({ onOpenReservation }) => {
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [time, setTime] = useState<string>('7:00 PM');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenReservation(guests, date, time);
  };

  return (
    <section
      id="reservations"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#B5502D] via-[#943F22] to-[#6E2E17] text-[#F5EFE3] overflow-hidden"
    >
      {/* Repeating botanical flourishes in background */}
      <div className="absolute inset-0 bg-botanical-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A44C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Banner Eyebrow */}
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] font-semibold text-[#E3CAA0] mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Book Your Table
        </span>

        {/* Banner Headline */}
        <h2 className="font-display italic text-3xl sm:text-5xl md:text-6xl text-[#F5EFE3] font-medium leading-tight mb-4 drop-shadow">
          Reserve your table and taste Southern Thailand tonight.
        </h2>

        {/* Botanical Motif Divider */}
        <div className="flex items-center justify-center gap-3 py-2 text-[#E3CAA0] opacity-80 mb-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#E3CAA0]" />
          <BotanicalMotif variant="lotus" className="w-5 h-5 text-[#E3CAA0]" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#E3CAA0]" />
        </div>

        <p className="text-xs sm:text-base text-[#F5EFE3]/90 max-w-xl mx-auto leading-relaxed mb-10 font-light">
          {RESTAURANT_INFO.reservationNotice}
        </p>

        {/* Interactive Quick Reservation Strip */}
        <form
          onSubmit={handleQuickBook}
          className="bg-[#1C1710]/90 backdrop-blur-md border border-[#C9A44C]/40 rounded-xl p-4 sm:p-6 max-w-3xl mx-auto shadow-2xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-left"
        >
          {/* Guests */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#C9A44C] font-semibold mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" /> Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-xs sm:text-sm text-[#F5EFE3] focus:border-[#C9A44C] focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#C9A44C] font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-2.5 py-2 text-xs sm:text-sm text-[#F5EFE3] focus:border-[#C9A44C] focus:outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#C9A44C] font-semibold mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Time Slot
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#241D13] border border-[#C9A44C]/30 rounded px-3 py-2 text-xs sm:text-sm text-[#F5EFE3] focus:border-[#C9A44C] focus:outline-none"
            >
              <option>5:00 PM</option>
              <option>5:30 PM</option>
              <option>6:00 PM</option>
              <option>6:30 PM</option>
              <option>7:00 PM</option>
              <option>7:45 PM</option>
              <option>8:15 PM</option>
              <option>8:45 PM</option>
              <option>9:30 PM</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded bg-[#C9A44C] hover:bg-[#E3CAA0] text-[#1C1710] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
            >
              <Sparkles className="w-3.5 h-3.5" /> Book Now
            </button>
          </div>
        </form>

        {/* Small Trust Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#F5EFE3]/80">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#E3CAA0]" /> Fishtown, Philadelphia
          </span>
          <span>·</span>
          <span>Walk-ins available daily at Bar & Chef's Counter</span>
          <span>·</span>
          <span>Direct Resy Booking Verified</span>
        </div>
      </div>
    </section>
  );
};
