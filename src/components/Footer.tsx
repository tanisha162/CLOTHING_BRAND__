import React from 'react';
import { Instagram, Facebook, Youtube, Ruler } from 'lucide-react';
import { AppPage } from '../types';

interface FooterProps {
  onNavigatePage?: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E1D7] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links & Newsletter info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#E8E1D7] text-xs sm:text-sm text-[#4E443A]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <span className="font-serif text-3xl tracking-tight text-[#1C1917] font-bold">
              Luméa
            </span>
            <p className="text-xs text-[#7A7065] leading-relaxed">
              Vibrant fashion curated for the modern wardrobe. Inclusive sizing XS to 2XL with guaranteed true fit.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE2D6] text-[#554637] text-xs font-semibold">
                ⚡ TriBe Club Rewards
              </span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs">
              Collections
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-[#5D5246]">
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('new-arrivals')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                New Arrivals
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('bestsellers')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                All Bestsellers
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('dresses')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                Dresses
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('tops')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                Tops & Tees
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('outerwear')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                Outerwear & Coats
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('handbags')}
                className="text-left hover:text-[#1C1917] transition-colors"
              >
                Handbags & Bags
              </button>
            </div>
          </div>

          {/* Sizing & Help */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs">
              Fit & Guidance
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-[#5D5246]">
              <button
                type="button"
                onClick={() => onNavigatePage && onNavigatePage('size-guide')}
                className="text-left hover:text-[#1C1917] font-semibold text-[#B85D3B] flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Fit Advisor</span>
              </button>
              <span className="text-[#7A6E62]">30-Day Free Exchanges</span>
              <span className="text-[#7A6E62]">How to Measure Guide</span>
              <span className="text-[#7A6E62]">Fabric Care Instructions</span>
              <span className="text-[#7A6E62]">Order Tracking</span>
            </div>
          </div>

          {/* Customer Care & Social */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs">
              Connect With Us
            </h4>
            <p className="text-xs text-[#7A7065]">
              Join over 150,000+ fashion lovers on our social community.
            </p>
            <div className="flex items-center space-x-3 text-[#3D352E] pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B85D3B] transition-colors p-2 rounded-full bg-white border border-[#E3DBD0]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B85D3B] transition-colors p-2 rounded-full bg-white border border-[#E3DBD0]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B85D3B] transition-colors p-2 rounded-full bg-white border border-[#E3DBD0]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7E73] gap-4">
          <p>© {currentYear} Luméa Fashion Brand. Inspired by modern boutique fashion & lifestyle.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Shipping & Return Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
