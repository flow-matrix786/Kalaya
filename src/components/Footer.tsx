import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

interface FooterProps {
  onOpenMenu: () => void;
  onOpenAbout: () => void;
  onOpenGiftCard: () => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMenu,
  onOpenAbout,
  onOpenGiftCard,
  onOpenReservation,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#14100A] text-[#CBBFA1] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#C9A44C]/25">
      {/* Background motif */}
      <div className="absolute inset-0 bg-botanical-pattern opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-16 border-b border-[#C9A44C]/20">
          
          {/* Col 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#C9A44C]/50 bg-[#1C1710] flex items-center justify-center text-[#C9A44C]">
                <BotanicalMotif variant="lotus" className="w-4 h-4" />
              </div>
              <span className="font-display font-semibold tracking-[0.16em] text-2xl text-[#E3CAA0] uppercase">
                Kalaya
              </span>
            </div>

            <p className="text-xs text-[#A69B82] leading-relaxed">
              Upscale Southern Thai fine dining in Philadelphia, celebrating the spirit and recipes of Trang province.
            </p>

            <div className="space-y-2 text-xs text-[#D8CFBC] pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A44C] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A44C] shrink-0" />
                <a href="tel:2153853777" className="hover:text-[#C9A44C] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A44C] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#C9A44C] transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A44C]/30 bg-[#1C1710] flex items-center justify-center text-[#E3CAA0] hover:text-[#1C1710] hover:bg-[#C9A44C] transition-all"
                aria-label="Kalaya on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A44C]/30 bg-[#1C1710] flex items-center justify-center text-[#E3CAA0] hover:text-[#1C1710] hover:bg-[#C9A44C] transition-all"
                aria-label="Kalaya on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Hours of Service */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#E3CAA0] font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C9A44C]" /> Hours of Service
            </h4>
            <div className="space-y-3 text-xs">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="border-b border-white/5 pb-2">
                  <div className="text-[#F5EFE3] font-medium">{h.days}</div>
                  <div className="text-[#C9A44C] font-mono text-[11px] mt-0.5">{h.times}</div>
                  <div className="text-[10px] text-[#8A7F65] uppercase tracking-wider">{h.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Navigation & Sister Concepts */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#E3CAA0] font-semibold">
              Explore & Sister Brands
            </h4>
            <ul className="space-y-2 text-xs text-[#D8CFBC]">
              <li>
                <button onClick={onOpenMenu} className="hover:text-[#C9A44C] transition-colors">
                  Full Dining Menus
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#C9A44C] transition-colors">
                  Chef Nok & Heritage Story
                </button>
              </li>
              <li>
                <button onClick={onOpenGiftCard} className="hover:text-[#C9A44C] transition-colors">
                  Gift Cards & Dining Passes
                </button>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-[#C9A44C] transition-colors">
                  Resy Table Bookings
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C9A44C] font-semibold mb-2">
                Sister Concepts
              </div>
              <ul className="space-y-1 text-xs text-[#8A7F65]">
                {RESTAURANT_INFO.sisterRestaurants.map((s, idx) => (
                  <li key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="text-[#D8CFBC]">{s.name}</span>
                    <span className="text-[#8A7F65] italic">{s.location}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4: Newsletter & Press */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#E3CAA0] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C9A44C]" /> The Spice Chronicle
            </h4>
            <p className="text-xs text-[#A69B82] leading-relaxed">
              Receive private invitations to seasonal tasting menus, cookbook signings, and special cellar releases.
            </p>

            {!newsletterSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#1C1710] border border-[#C9A44C]/30 rounded px-3 py-2 text-xs text-[#F5EFE3] placeholder:text-[#6D634E] focus:border-[#C9A44C] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-[#B5502D] hover:bg-[#943F22] text-white text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="p-3 rounded bg-[#2F3B2A] border border-[#C9A44C]/30 text-xs text-[#E3CAA0] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A44C] shrink-0" />
                <span>Sawasdee! You are now subscribed to our chronicle.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A7F65]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Kalaya Southern Thai Kitchen. All rights reserved.</span>
            <span>·</span>
            <a href="#" className="hover:text-[#C9A44C] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#C9A44C] transition-colors">Accessibility (WCAG AA)</a>
            <span>·</span>
            <a href="#" className="hover:text-[#C9A44C] transition-colors">Terms of Service</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#C9A44C] hover:text-[#E3CAA0] transition-colors text-xs uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
