import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  heroImage: string;
  onShopNewArrivals: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage,
  onShopNewArrivals,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F6F1EA] via-[#FAF8F5] to-[#F3EDE3] border-b border-[#EBE3D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] sm:min-h-[640px] py-10 lg:py-0">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 z-10 py-6 sm:py-10">
            {/* Tagline */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#827466] uppercase">
                Effortless Style, Every Day
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] text-[#1C1917] tracking-tight">
              Look Good. <br />
              <span className="italic font-normal font-serif text-[#3E342B]">
                Feel Amazing.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#645A50] text-base sm:text-lg max-w-lg leading-relaxed font-normal">
              Timeless pieces for the modern woman — made for your everyday and every
              special moment.
            </p>

            {/* CTA Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                id="hero-shop-arrivals-btn"
                onClick={onShopNewArrivals}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1C1917] text-white text-sm font-medium tracking-wide rounded-sm hover:bg-[#38312B] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft decorative ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#EBD8C7]/40 via-transparent to-[#F1DFC9]/30 rounded-3xl blur-2xl -z-10" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E7DFD4] bg-stone-100 group">
                <img
                  src={heroImage}
                  alt="Luméa modern fashion collection model"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle bottom vignette gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
