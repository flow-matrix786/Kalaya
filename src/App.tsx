import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChefSpotlight } from './components/ChefSpotlight';
import { MenuTeaser } from './components/MenuTeaser';
import { ReservationBanner } from './components/ReservationBanner';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ReservationModal } from './components/ReservationModal';
import { MenuModal } from './components/MenuModal';
import { GiftCardModal } from './components/GiftCardModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Reservation pre-fill states
  const [resPartySize, setResPartySize] = useState<number>(2);
  const [resDate, setResDate] = useState<string | undefined>(undefined);
  const [resTime, setResTime] = useState<string | undefined>(undefined);

  const handleOpenReservation = (partySize?: number, date?: string, time?: string) => {
    if (partySize) setResPartySize(partySize);
    if (date) setResDate(date);
    if (time) setResTime(time);
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1C1710] text-[#F5EFE3] selection:bg-[#C9A44C] selection:text-[#1C1710] font-sans antialiased relative">
      {/* 1. Sticky/Overlay Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main>
        {/* 2. Full-bleed Hero */}
        <Hero
          onOpenReservation={() => handleOpenReservation()}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* 3. Chef Spotlight */}
        <ChefSpotlight onOpenAbout={() => setIsAboutOpen(true)} />

        {/* 4. Menu Teaser */}
        <MenuTeaser
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenReservation={() => handleOpenReservation()}
        />

        {/* 5. Second CTA Banner */}
        <ReservationBanner
          onOpenReservation={(party, d, t) => handleOpenReservation(party, d, t)}
        />
      </main>

      {/* 6. Footer */}
      <Footer
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenGiftCard={() => setIsGiftCardOpen(true)}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 7. Add-On: AI Chatbot Concierge Widget */}
      <ChatbotWidget
        onOpenReservation={() => handleOpenReservation()}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Interactive Modals */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialPartySize={resPartySize}
        initialDate={resDate}
        initialTime={resTime}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenReservation={() => {
          setIsMenuOpen(false);
          handleOpenReservation();
        }}
      />

      <GiftCardModal
        isOpen={isGiftCardOpen}
        onClose={() => setIsGiftCardOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenReservation={() => {
          setIsAboutOpen(false);
          handleOpenReservation();
        }}
      />
    </div>
  );
}
