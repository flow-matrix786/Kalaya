import React from 'react';

interface BotanicalProps {
  className?: string;
  variant?: 'flourish' | 'divider' | 'lotus' | 'corner' | 'mandala';
}

export const BotanicalMotif: React.FC<BotanicalProps> = ({ className = '', variant = 'flourish' }) => {
  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-3 py-2 text-[#C9A44C] opacity-80 ${className}`}>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C9A44C] to-[#C9A44C]/30" />
        <svg
          viewBox="0 0 36 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="w-8 h-6 text-[#C9A44C]"
          aria-hidden="true"
        >
          {/* Central Lotus Flourish */}
          <path d="M18 3C18 3 13 10 13 15C13 18 15.5 20 18 20C20.5 20 23 18 23 15C23 10 18 3 18 3Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M18 3C18 3 8 11 8 16C8 19 11 21 14 20" strokeLinecap="round" />
          <path d="M18 3C18 3 28 11 28 16C28 19 25 21 22 20" strokeLinecap="round" />
          <circle cx="18" cy="14" r="1.5" fill="currentColor" />
          <circle cx="6" cy="17" r="1" fill="currentColor" />
          <circle cx="30" cy="17" r="1" fill="currentColor" />
        </svg>
        <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#C9A44C] to-[#C9A44C]/30" />
      </div>
    );
  }

  if (variant === 'lotus') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className={`text-[#C9A44C] ${className}`}
        aria-hidden="true"
      >
        <path
          d="M24 6C24 6 17 17 17 25C17 31 20 34 24 34C28 34 31 31 31 25C31 17 24 6 24 6Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
        />
        <path
          d="M24 10C24 10 11 19 11 28C11 33.5 15.5 37 20 36C22 35.5 23.5 34 24 34"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M24 10C24 10 37 19 37 28C37 33.5 32.5 37 28 36C26 35.5 24.5 34 24 34"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M6 31C11 30 18 33 24 37C30 33 37 30 42 31"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <circle cx="24" cy="22" r="2" fill="currentColor" />
        <circle cx="16" cy="28" r="1" fill="currentColor" />
        <circle cx="32" cy="28" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className={`text-[#C9A44C] ${className}`}
        aria-hidden="true"
      >
        <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" strokeLinecap="round" />
        <path d="M6 38V14C6 9.58172 9.58172 6 14 6H38" strokeDasharray="2 3" opacity="0.6" />
        <path d="M12 12C12 12 16 18 22 18C18 22 12 22 12 12Z" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (variant === 'mandala') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className={`text-[#C9A44C] ${className}`}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeDasharray="3 4" opacity="0.4" />
        <circle cx="50" cy="50" r="32" stroke="currentColor" opacity="0.5" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" opacity="0.7" fill="currentColor" fillOpacity="0.05" />
        {/* Radiating floral petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle} 50 50)`}>
            <path d="M50 18 C46 28 46 36 50 42 C54 36 54 28 50 18 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" />
            <circle cx="50" cy="12" r="1.5" fill="currentColor" />
          </g>
        ))}
        <circle cx="50" cy="50" r="3" fill="currentColor" />
      </svg>
    );
  }

  // Default flourish
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`text-[#C9A44C] ${className}`}
      aria-hidden="true"
    >
      <path
        d="M32 4C32 4 23 14 23 20C23 24.5 27 28 32 28C37 28 41 24.5 41 20C41 14 32 4 32 4Z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M32 8C27 13 14 16 6 14C3 13 2 15 3 17C8 22 17 23 25 21"
        strokeLinecap="round"
      />
      <path
        d="M32 8C37 13 50 16 58 14C61 13 62 15 61 17C56 22 47 23 39 21"
        strokeLinecap="round"
      />
      <circle cx="32" cy="18" r="2" fill="currentColor" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" />
      <circle cx="52" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
};
