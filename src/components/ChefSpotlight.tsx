import React from 'react';
import { Award, BookOpen, Tv, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { CHEF_BIO } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

interface ChefSpotlightProps {
  onOpenAbout: () => void;
}

export const ChefSpotlight: React.FC<ChefSpotlightProps> = ({ onOpenAbout }) => {
  return (
    <section id="chef" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#241D13] text-[#F5EFE3] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5502D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2F3B2A]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Chef Visual / Portrait Presentation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-lg overflow-hidden border border-[#C9A44C]/35 bg-gradient-to-br from-[#2F3B2A] via-[#1C1710] to-[#241D13] p-1 shadow-2xl group">
              {/* Outer decorative border frame */}
              <div className="w-full h-full rounded-md border border-[#C9A44C]/20 flex flex-col items-center justify-between p-6 sm:p-8 text-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B5502D]/20 via-[#1C1710] to-[#2F3B2A]/40">
                
                {/* Top botanical badge */}
                <div className="w-12 h-12 rounded-full border border-[#C9A44C]/40 bg-[#1C1710] flex items-center justify-center text-[#C9A44C] shadow-md">
                  <BotanicalMotif variant="lotus" className="w-6 h-6" />
                </div>

                {/* Chef Monogram & Visual Showcase */}
                <div className="my-auto space-y-3">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-[#1C1710] border-2 border-[#C9A44C] p-1.5 shadow-xl flex items-center justify-center relative">
                    <span className="font-display italic text-3xl sm:text-4xl text-[#E3CAA0] font-bold">
                      Nok
                    </span>
                    <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#B5502D] text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                      Chef · Owner
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="font-display italic text-2xl sm:text-3xl text-[#E3CAA0] font-semibold">
                      {CHEF_BIO.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#C9A44C] mt-1 font-medium">
                      Trang, Southern Thailand
                    </p>
                  </div>
                </div>

                {/* Bottom Accolade Ribbon */}
                <div className="w-full pt-4 border-t border-[#C9A44C]/20 text-[11px] uppercase tracking-[0.18em] text-[#D8CFBC]">
                  <span className="text-[#C9A44C] font-semibold">James Beard Award</span> Winner 2023
                </div>

                {/* Corner SVG flourishes */}
                <div className="absolute top-2 left-2 opacity-40">
                  <BotanicalMotif variant="corner" className="w-8 h-8" />
                </div>
                <div className="absolute top-2 right-2 opacity-40 -scale-x-100">
                  <BotanicalMotif variant="corner" className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Quick badges under portrait */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm sm:max-w-md mt-4 text-center">
              <div className="p-2.5 rounded bg-[#1C1710] border border-[#C9A44C]/20">
                <Award className="w-4 h-4 text-[#C9A44C] mx-auto mb-1" />
                <div className="text-[10px] font-bold uppercase text-[#E3CAA0]">James Beard</div>
                <div className="text-[9px] text-[#8A7F65]">Best Chef 2023</div>
              </div>
              <div className="p-2.5 rounded bg-[#1C1710] border border-[#C9A44C]/20">
                <Tv className="w-4 h-4 text-[#B5502D] mx-auto mb-1" />
                <div className="text-[10px] font-bold uppercase text-[#E3CAA0]">Chef’s Table</div>
                <div className="text-[9px] text-[#8A7F65]">Netflix Feature</div>
              </div>
              <div className="p-2.5 rounded bg-[#1C1710] border border-[#C9A44C]/20">
                <BookOpen className="w-4 h-4 text-[#2F3B2A] text-emerald-500 mx-auto mb-1" />
                <div className="text-[10px] font-bold uppercase text-[#E3CAA0]">Cookbook</div>
                <div className="text-[9px] text-[#8A7F65]">NYT Best Seller</div>
              </div>
            </div>
          </div>

          {/* Chef Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[#B5502D] text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Chef Spotlight · James Beard Award
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F5EFE3] italic font-semibold leading-tight">
                Shaped by her mother’s market stall in Trang.
              </h2>
            </div>

            <BotanicalMotif variant="divider" className="justify-start my-2" />

            {/* Chef Quote */}
            <blockquote className="border-l-2 border-[#C9A44C] pl-4 sm:pl-6 py-1 italic font-serif text-base sm:text-lg text-[#E3CAA0] leading-relaxed bg-[#1C1710]/40 rounded-r-md">
              “{CHEF_BIO.quote}”
            </blockquote>

            {/* Bio Body */}
            <div className="space-y-3.5 text-xs sm:text-sm text-[#D8CFBC] leading-relaxed">
              <p>
                Raised in the spice-abundant coastal town of Trang in southern Thailand, <strong>Chef Chutatip “Nok” Suntaranon</strong> learned to pound curries from scratch beside her mother, Kalaya. After years of international travel and French culinary classical training in New York, Chef Nok opened Kalaya with an unapologetic vision: to honor her mother’s legacy with authentic, fiery Southern Thai cooking that pulls no punches.
              </p>
              <p>
                Since opening, Kalaya has transformed Philadelphia into a national epicenter for Thai gastronomy, winning the <strong>James Beard Award for Best Chef: Mid-Atlantic</strong>, Esquire’s Best New Restaurant in America, and spots on the New York Times Top 50.
              </p>
              <p>
                Her debut cookbook, <em>“Kalaya’s Southern Thai Kitchen”</em>, was heralded as one of the best cookbooks of the decade, celebrating whole fish, vibrant fresh herbs, and hand-pounded pastes.
              </p>
            </div>

            {/* Accolades highlight pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded bg-[#1C1710] border border-[#C9A44C]/30 text-[#E3CAA0]">
                🏆 James Beard Foundation Best Chef 2023
              </span>
              <span className="px-3 py-1 rounded bg-[#1C1710] border border-[#C9A44C]/30 text-[#E3CAA0]">
                📺 Netflix Chef’s Table
              </span>
              <span className="px-3 py-1 rounded bg-[#1C1710] border border-[#C9A44C]/30 text-[#E3CAA0]">
                📖 NYT & Eater Best Cookbook
              </span>
            </div>

            {/* Link to Full About Story */}
            <div className="pt-4">
              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#C9A44C] hover:text-[#E3CAA0] group transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
              >
                <span>Read Full Chef Biography & Mother's Legacy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
