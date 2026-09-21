import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Our Story', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E1D7] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Links & Social Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#E8E1D7]">
          
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-serif text-3xl tracking-tight text-[#1C1917] font-semibold">
              Luméa
            </span>
            <span className="text-[9px] tracking-[0.28em] text-[#7A7065] uppercase font-medium">
              Wear Your Story
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#4E443A]">
            {footerLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-[#1C1917] transition-colors"
                >
                  {link.label}
                </a>
                {idx < footerLinks.length - 1 && (
                  <span className="text-[#C4B7AA] hidden sm:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-5 text-[#3D352E]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B85D3B] transition-colors p-1.5 rounded-full hover:bg-[#EFEAE2]"
              aria-label="Follow Luméa on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Pinterest SVG icon */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B85D3B] transition-colors p-1.5 rounded-full hover:bg-[#EFEAE2]"
              aria-label="Follow Luméa on Pinterest"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.154-1.498-.696-2.435-2.881-2.435-4.639 0-3.778 2.747-7.248 7.917-7.248 4.158 0 7.391 2.964 7.391 6.924 0 4.131-2.604 7.457-6.219 7.457-1.214 0-2.356-.632-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B85D3B] transition-colors p-1.5 rounded-full hover:bg-[#EFEAE2]"
              aria-label="Follow Luméa on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* TikTok SVG icon */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B85D3B] transition-colors p-1.5 rounded-full hover:bg-[#EFEAE2]"
              aria-label="Follow Luméa on TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B85D3B] transition-colors p-1.5 rounded-full hover:bg-[#EFEAE2]"
              aria-label="Follow Luméa on YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7E73] gap-4">
          <p>© {currentYear} Luméa. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#" className="hover:text-[#1C1917] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
