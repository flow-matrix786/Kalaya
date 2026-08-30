import React, { useState } from 'react';
import { X, Flame, Sparkles, Filter, Wine, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Complete Menu' },
    { id: 'starters', label: 'Starters & Dumplings' },
    { id: 'curries', label: 'Southern Curries' },
    { id: 'wok_charcoal', label: 'Wok & Charcoal' },
    { id: 'seafood', label: 'Seafood Classics' },
    { id: 'desserts', label: 'Thai Sweets' },
    { id: 'cocktails', label: 'Cocktails & Spirits' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesDietary =
      dietaryFilter === 'all' ||
      (item.dietary && item.dietary.some((d) => d.toLowerCase().includes(dietaryFilter.toLowerCase())));
    return matchesCategory && matchesDietary;
  });

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-[#1C1710] border border-[#C9A44C]/35 rounded-lg shadow-2xl overflow-hidden text-[#F5EFE3]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-modal-title"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#241D13] to-[#1C1710] border-b border-[#C9A44C]/25 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.28em] uppercase">
            Curated Culinary Catalog
          </span>
          <h2 id="menu-modal-title" className="font-display text-2xl sm:text-4xl text-[#E3CAA0] italic font-semibold mt-1">
            Southern Thai Dining Collection
          </h2>
          <BotanicalMotif variant="divider" className="my-2" />
          <p className="text-xs sm:text-sm text-[#C9BFA6] max-w-xl mx-auto">
            Dishes are crafted for family-style sharing, honoring the spice trade, market stalls, and fishing ports of Trang province.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pt-4 pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all uppercase tracking-wider font-medium ${
                  activeTab === cat.id
                    ? 'bg-[#C9A44C] text-[#1C1710] font-bold shadow-md'
                    : 'bg-[#241D13] text-[#D8CFBC] border border-[#C9A44C]/20 hover:border-[#C9A44C]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#A69B82]">
            <Filter className="w-3 h-3 text-[#C9A44C]" />
            <span>Filter by:</span>
            {['all', 'Gluten-Free', 'Dairy-Free', 'Vegetarian'].map((filter) => (
              <button
                key={filter}
                onClick={() => setDietaryFilter(filter)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  dietaryFilter === filter
                    ? 'border-[#B5502D] bg-[#B5502D]/20 text-[#E3CAA0] font-semibold'
                    : 'border-transparent text-[#8A7F65] hover:text-[#D8CFBC]'
                }`}
              >
                {filter === 'all' ? 'All Diets' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-md border border-[#C9A44C]/20 bg-[#241D13]/60 hover:bg-[#241D13] hover:border-[#C9A44C]/45 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-base sm:text-lg text-[#F5EFE3] group-hover:text-[#E3CAA0] transition-colors font-semibold">
                          {item.name}
                        </h4>
                        {renderSpiceIndicator(item.spiceLevel)}
                      </div>
                      <span className="text-xs text-[#C9A44C] font-serif italic tracking-wide">
                        {item.thaiName}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#E3CAA0] font-mono shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {item.tag && (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#B5502D]/20 text-[#E3CAA0] border border-[#B5502D]/40 mb-2">
                      {item.tag}
                    </span>
                  )}

                  <p className="text-xs sm:text-sm text-[#C9BFA6] leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Dietary pills & ingredients */}
                <div className="pt-2 border-t border-[#C9A44C]/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    {item.dietary?.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-[#1C1710] text-[#A69B82] border border-[#C9A44C]/15 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.ingredients && (
                    <span className="text-[#8A7F65] italic text-[10px] hidden sm:inline">
                      {item.ingredients.slice(0, 3).join(' · ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-[#A69B82]">
              <UtensilsCrossed className="w-10 h-10 mx-auto text-[#C9A44C]/50 mb-3" />
              <p>No dishes match the selected dietary criteria.</p>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setDietaryFilter('all');
                }}
                className="mt-3 text-xs text-[#C9A44C] underline hover:text-[#E3CAA0]"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 bg-[#241D13] border-t border-[#C9A44C]/25 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#A69B82] text-center sm:text-left">
            <span>Special dietary requests? Ask your server or our AI Concierge.</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs uppercase tracking-wider text-[#D8CFBC] border border-[#C9A44C]/30 rounded hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="flex-1 sm:flex-initial px-6 py-2 text-xs uppercase tracking-wider bg-[#B5502D] hover:bg-[#943F22] text-white font-medium rounded transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E3CAA0]" /> Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
