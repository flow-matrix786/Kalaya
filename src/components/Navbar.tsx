import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, CheckCircle2, Search, ArrowRight, ShieldCheck, Menu as MenuIcon, X } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface NavbarProps {
  onOpenOrder: (tier?: 'starter' | 'standard' | 'pro') => void;
  onOpenTracker: () => void;
  onOpenPayment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrder,
  onOpenTracker,
  onOpenPayment,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Agentify<span className="text-pink-500">-360</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Official Agency
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono tracking-wide">Custom Instagram DM Bots</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#pricing"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Packages & Pricing
          </a>
          <a
            href="#simulator"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Live DM Demo
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Capabilities
          </a>
          <button
            onClick={onOpenPayment}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Bank Info</span>
          </button>
          <button
            onClick={onOpenTracker}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenOrder()}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 transition-all shadow-md shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <span>Order Agent</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1422] border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            Packages & Pricing ($150 - $600)
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            Live DM Demo Simulator
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-white"
          >
            Agency Capabilities
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPayment();
            }}
            className="w-full text-left py-2 text-base font-medium text-emerald-400 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Meezan Bank Details</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left py-2 text-base font-medium text-amber-400 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Check Order Status</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center gap-2"
            >
              <span>Build My DM Agent Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
