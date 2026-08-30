import React from 'react';
import { Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { BotanicalMotif } from './BotanicalMotif';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onOpenMenu }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-[#1C1710]"
    >
      {/* Layered atmospheric gradients: Burnt terracotta top radial, deep herbal green bottom corner, charcoal base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(181,80,45,0.38),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(47,59,42,0.45),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(201,164,76,0.12),transparent_40%)] pointer-events-none" />

      {/* Repeating background diagonal spice line texture */}
      <div className="absolute inset-0 bg-botanical-pattern opacity-40 pointer-events-none" />

      {/* Decorative Corner Flourishes */}
      <div className="absolute top-24 left-6 hidden lg:block opacity-30">
        <BotanicalMotif variant="corner" className="w-12 h-12" />
      </div>
      <div className="absolute top-24 right-6 hidden lg:block opacity-30 -scale-x-100">
        <BotanicalMotif variant="corner" className="w-12 h-12" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Eyebrow with gold botanical motif */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A44C]/35 bg-[#241D13]/70 backdrop-blur-sm mb-6 animate-fade-in shadow-inner">
          <BotanicalMotif variant="lotus" className="w-3.5 h-3.5 text-[#C9A44C]" />
          <span className="text-[#E3CAA0] text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold">
            Philadelphia · Southern Thai Fine Dining
          </span>
          <BotanicalMotif variant="lotus" className="w-3.5 h-3.5 text-[#C9A44C]" />
        </div>

        {/* Restaurant Name */}
        <h1 className="font-display font-medium italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E3CAA0] tracking-tight leading-[1.05] drop-shadow-md">
          Kalaya
        </h1>

        {/* Gold ornamental flourish divider */}
        <BotanicalMotif variant="divider" className="my-4 sm:my-6 w-48 sm:w-64" />

        {/* 1-Line Brand Statement */}
        <p className="font-display italic text-lg sm:text-2xl md:text-3xl text-[#F5EFE3] max-w-2xl mx-auto leading-snug font-normal">
          “Bold flavors, vibrant spices, and celebratory Southern Thai soul.”
        </p>

        {/* Evocative sub-paragraph */}
        <p className="mt-4 text-xs sm:text-base text-[#D8CFBC] max-w-xl mx-auto leading-relaxed font-light">
          Built upon heirloom market recipes from Trang province, honoring Chef Nok’s mother with uncompromising heat, fresh turmeric curries, and joyful hospitality.
        </p>

        {/* Call to action buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded bg-[#B5502D] hover:bg-[#943F22] text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl shadow-[#B5502D]/25 flex items-center justify-center gap-2 group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            <Sparkles className="w-4 h-4 text-[#E3CAA0] group-hover:rotate-12 transition-transform" />
            Reserve a Table
          </button>

          <button
            onClick={onOpenMenu}
            className="w-full sm:w-auto px-8 py-4 rounded border border-[#C9A44C] bg-[#1C1710]/60 hover:bg-[#C9A44C]/10 text-[#E3CAA0] hover:text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            Explore Menus
          </button>
        </div>

        {/* Accolade preview bar */}
        <div className="mt-12 pt-6 border-t border-[#C9A44C]/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#A69B82]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A44C]">★</span> James Beard Award Winner
          </span>
          <span className="hidden sm:inline text-[#C9A44C]/40">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A44C]">★</span> Esquire Best New Restaurant
          </span>
          <span className="hidden sm:inline text-[#C9A44C]/40">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#C9A44C]">★</span> NYT Top 50 in America
          </span>
        </div>
      </div>

      {/* Pulsing Scroll Cue */}
      <a
        href="#chef"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C9A44C]/70 hover:text-[#C9A44C] transition-colors"
        aria-label="Scroll to Chef Spotlight section"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
