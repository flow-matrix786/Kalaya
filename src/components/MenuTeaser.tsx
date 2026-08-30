import React from 'react';
import { Flame, UtensilsCrossed, Sparkles, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

interface MenuTeaserProps {
  onOpenMenu: () => void;
  onOpenReservation: () => void;
}

export const MenuTeaser: React.FC<MenuTeaserProps> = ({ onOpenMenu, onOpenReservation }) => {
  const featuredDishes = MENU_ITEMS.filter((item) => item.featured).slice(0, 4);

  const renderSpiceIndicator = (level: number) => {
    if (level === 0) return null;
    return (
      <div className="flex items-center gap-0.5" title={`Spice Level ${level} of 4`}>
        {Array.from({ length: level }).map((_, i) => (
          <Flame key={i} className="w-3.5 h-3.5 text-[#B5502D] fill-[#B5502D]" />
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1C1710] text-[#F5EFE3] overflow-hidden">
      {/* Background motif and glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A44C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-botanical-pattern opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.3em] uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Culinary Style & Signatures
          </span>
          
          <h2 className="font-display italic text-3xl sm:text-5xl md:text-6xl text-[#E3CAA0] mt-2 mb-4 font-medium leading-tight">
            Every dish radiates heat, fragrant herbs, and energy.
          </h2>

          <BotanicalMotif variant="divider" className="my-4" />

          <p className="text-xs sm:text-base text-[#D8CFBC] leading-relaxed font-light max-w-2xl mx-auto">
            Unlike Central Thai cooking, Southern Thai cuisine is defined by its deep golden turmeric hues, unapologetic bird’s eye chili heat, wild herbs, and fresh seafood straight from the Gulf of Thailand and Andaman Sea.
          </p>
        </div>

        {/* Featured Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left mb-12">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="relative p-6 sm:p-7 rounded-lg border border-[#C9A44C]/25 bg-gradient-to-b from-[#241D13] to-[#1C1710] hover:border-[#C9A44C]/60 transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              {/* Card Corner Ornament */}
              <div className="absolute top-2 right-2 opacity-25 group-hover:opacity-60 transition-opacity">
                <BotanicalMotif variant="lotus" className="w-5 h-5 text-[#C9A44C]" />
              </div>

              <div>
                {/* Header: Title & Spice & Price */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display italic text-xl sm:text-2xl text-[#F5EFE3] group-hover:text-[#E3CAA0] transition-colors font-semibold">
                        {dish.name}
                      </h3>
                      {renderSpiceIndicator(dish.spiceLevel)}
                    </div>
                    <span className="text-xs text-[#C9A44C] font-serif italic tracking-wide">
                      {dish.thaiName}
                    </span>
                  </div>
                  <span className="text-base font-semibold text-[#E3CAA0] font-mono shrink-0">
                    {dish.price}
                  </span>
                </div>

                {/* Tag Badge */}
                {dish.tag && (
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#B5502D]/20 text-[#E3CAA0] border border-[#B5502D]/40 mb-3">
                    {dish.tag}
                  </span>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#C9BFA6] leading-relaxed mb-4">
                  {dish.description}
                </p>
              </div>

              {/* Ingredients & Dietary tags */}
              <div className="pt-3 border-t border-[#C9A44C]/15 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex flex-wrap gap-1.5">
                  {dish.dietary?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#1C1710] text-[#A69B82] border border-[#C9A44C]/15 text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {dish.ingredients && (
                  <span className="text-[#8A7F65] italic text-[11px] hidden sm:inline">
                    {dish.ingredients.slice(0, 3).join(' · ')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: "Our Menus" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenMenu}
            className="w-full sm:w-auto px-10 py-4 rounded bg-[#C9A44C] hover:bg-[#E3CAA0] text-[#1C1710] text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl shadow-[#C9A44C]/20 flex items-center justify-center gap-2 group focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            <UtensilsCrossed className="w-4 h-4" />
            View Our Full Menus & Cocktails
          </button>
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded border border-[#C9A44C]/50 hover:border-[#C9A44C] text-[#E3CAA0] hover:text-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          >
            Reserve Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};
