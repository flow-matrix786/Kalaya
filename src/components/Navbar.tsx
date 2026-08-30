import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { BotanicalMotif } from './BotanicalMotif';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenGiftCard: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenGiftCard,
  onOpenAbout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1C1710]/95 backdrop-blur-md py-3 shadow-2xl border-b border-[#C9A44C]/25'
          : 'bg-gradient-to-b from-[#1C1710]/90 via-[#1C1710]/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo (Left) */}
        <a
          href="#"
          className="group flex items-center gap-2 text-decoration-none focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          aria-label="Kalaya Southern Thai Kitchen Home"
        >
          <div className="w-8 h-8 rounded-full border border-[#C9A44C]/40 bg-[#241D13] flex items-center justify-center text-[#C9A44C] group-hover:border-[#C9A44C] group-hover:scale-105 transition-all">
            <BotanicalMotif variant="lotus" className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold tracking-[0.14em] text-lg sm:text-xl text-[#E3CAA0] uppercase group-hover:text-white transition-colors">
              Kalaya
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#C9A44C] font-mono -mt-1 hidden xs:block">
              Philly · Southern Thai
            </span>
          </div>
        </a>

        {/* Desktop Navigation (Right) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" aria-label="Main Navigation">
          <button
            onClick={onOpenMenu}
            className="text-xs uppercase tracking-[0.18em] text-[#E3DAC9] hover:text-[#C9A44C] transition-colors py-1 relative group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            Menu
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A44C] transition-all duration-300 group-hover:w-full" />
          </button>

          <a
            href="#chef"
            className="text-xs uppercase tracking-[0.18em] text-[#E3DAC9] hover:text-[#C9A44C] transition-colors py-1 relative group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A44C] transition-all duration-300 group-hover:w-full" />
          </a>

          <button
            onClick={onOpenGiftCard}
            className="text-xs uppercase tracking-[0.18em] text-[#E3DAC9] hover:text-[#C9A44C] transition-colors py-1 relative group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            Gift Cards
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A44C] transition-all duration-300 group-hover:w-full" />
          </button>

          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.18em] text-[#E3DAC9] hover:text-[#C9A44C] transition-colors py-1 relative group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9A44C] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Reservations CTA */}
          <button
            onClick={onOpenReservation}
            className="px-5 py-2 rounded border border-[#C9A44C] bg-transparent text-[#E3CAA0] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C9A44C] hover:text-[#1C1710] transition-all duration-300 shadow-sm flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            <Calendar className="w-3.5 h-3.5" /> Reservations
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenReservation}
            className="px-3 py-1.5 rounded border border-[#C9A44C] text-[#E3CAA0] text-[11px] font-semibold uppercase tracking-wider"
          >
            Book
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#E3CAA0] hover:text-white focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1C1710] border-b border-[#C9A44C]/30 px-6 py-6 space-y-4 text-center">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMenu();
              }}
              className="text-sm uppercase tracking-[0.2em] text-[#E3DAC9] hover:text-[#C9A44C] py-2 border-b border-white/5"
            >
              Menu
            </button>
            <a
              href="#chef"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-[#E3DAC9] hover:text-[#C9A44C] py-2 border-b border-white/5"
            >
              About Chef & Story
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenGiftCard();
              }}
              className="text-sm uppercase tracking-[0.2em] text-[#E3DAC9] hover:text-[#C9A44C] py-2 border-b border-white/5"
            >
              Gift Cards
            </button>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-[#E3DAC9] hover:text-[#C9A44C] py-2 border-b border-white/5"
            >
              Hours & Location
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded bg-[#B5502D] text-white text-xs uppercase tracking-[0.2em] font-semibold mt-2"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
