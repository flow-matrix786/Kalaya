import React from 'react';
import { X, Award, BookOpen, Tv, Heart, MapPin } from 'lucide-react';
import { CHEF_BIO, RESTAURANT_INFO } from '../data/restaurantData';
import { BotanicalMotif } from './BotanicalMotif';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#1C1710] border border-[#C9A44C]/35 rounded-lg shadow-2xl p-6 sm:p-10 text-[#F5EFE3]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#E3CAA0] hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A44C]"
          aria-label="Close about dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <span className="text-[#C9A44C] text-xs font-semibold tracking-[0.28em] uppercase">
            Heritage & Storytelling
          </span>
          <h2 id="about-modal-title" className="font-display text-2xl sm:text-4xl text-[#E3CAA0] italic font-semibold mt-1">
            The Soul of Kalaya
          </h2>
          <BotanicalMotif variant="divider" className="my-3" />
          <p className="text-xs sm:text-sm text-[#C9BFA6] max-w-lg mx-auto italic font-serif">
            “Named after my mother, Kalaya. A testament to her fiery spirit, her endless generosity, and the spice-rich cuisine of Trang.”
          </p>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-4 text-xs sm:text-sm text-[#D8CFBC] leading-relaxed mb-8">
          {CHEF_BIO.story.map((paragraph, index) => (
            <p key={index} className="first-letter:text-2xl first-letter:font-serif first-letter:text-[#C9A44C] first-letter:mr-1">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Accolades Showcase */}
        <div className="bg-[#241D13] border border-[#C9A44C]/25 rounded-lg p-5 sm:p-6 mb-8">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A44C] font-semibold mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#C9A44C]" /> Awards & Honors
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHEF_BIO.accolades.map((acc, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded bg-[#1C1710]/70 border border-[#C9A44C]/15">
                <span className="font-mono text-[#E3CAA0] font-bold text-xs shrink-0 mt-0.5">
                  {acc.year}
                </span>
                <div>
                  <div className="text-xs font-semibold text-[#F5EFE3]">{acc.award}</div>
                  <div className="text-[11px] text-[#8A7F65]">{acc.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Quote Banner */}
        <div className="bg-gradient-to-r from-[#2F3B2A] to-[#241D13] border border-[#C9A44C]/30 rounded-lg p-5 text-center mb-8">
          <p className="font-serif italic text-sm sm:text-base text-[#E3CAA0] mb-2">
            "{RESTAURANT_INFO.pressQuotes[0].quote}"
          </p>
          <span className="text-[11px] uppercase tracking-widest text-[#C9A44C] font-semibold">
            — {RESTAURANT_INFO.pressQuotes[0].source}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#C9A44C]/20">
          <span className="text-xs text-[#8A7F65] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C9A44C]" /> 4 W. Palmer Street, Fishtown, PA
          </span>
          <div className="flex gap-3 w-full sm:w-auto">
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
              className="flex-1 sm:flex-initial px-6 py-2 text-xs uppercase tracking-wider bg-[#B5502D] hover:bg-[#943F22] text-white font-medium rounded transition-colors"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
