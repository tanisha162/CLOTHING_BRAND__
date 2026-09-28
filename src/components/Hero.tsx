import React from 'react';
import { ArrowRight, Sparkles, Flame, Ruler } from 'lucide-react';

interface HeroProps {
  heroImage: string;
  onShopNewArrivals: () => void;
  onExploreBestsellers?: () => void;
  onOpenSizeGuide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage,
  onShopNewArrivals,
  onExploreBestsellers,
  onOpenSizeGuide,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F6F1EA] via-[#FAF8F5] to-[#F3EDE3] border-b border-[#EBE3D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[560px] sm:min-h-[620px] py-10 lg:py-0">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 z-10 py-6 sm:py-10">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EAE2D6] text-[#695A4B] text-[11px] sm:text-xs tracking-wider font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B85D3B]" />
                Summer &apos;26 Drops Are Live
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[74px] leading-[1.08] text-[#1C1917] tracking-tight font-bold">
              Look Good. <br />
              <span className="italic font-normal font-serif text-[#3E342B]">
                Feel Amazing.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#645A50] text-base sm:text-lg max-w-lg leading-relaxed font-normal">
              Effortless everyday styles, premium breathable fabrics, and inclusive sizing from XS to 2XL — made for your every day and every special moment.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="hero-shop-arrivals-btn"
                onClick={onShopNewArrivals}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1C1917] text-white text-xs sm:text-sm font-bold tracking-wide rounded-full hover:bg-[#38312B] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {onExploreBestsellers && (
                <button
                  type="button"
                  onClick={onExploreBestsellers}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-[#1C1917] text-xs sm:text-sm font-bold tracking-wide rounded-full border border-[#D8CFC2] hover:bg-[#F2ECE3] transition-all shadow-xs"
                >
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>All Bestsellers</span>
                </button>
              )}

              {onOpenSizeGuide && (
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-[#6A5A4B] hover:text-[#1C1917] text-xs font-semibold hover:underline transition-all"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#B85D3B]" />
                  <span>Size & Fit Finder</span>
                </button>
              )}
            </div>

            {/* Trust highlights */}
            <div className="pt-2 flex items-center gap-6 text-xs text-[#7A6E63] font-medium">
              <span>✨ 100% Genuine Quality</span>
              <span>&bull;</span>
              <span>⚡ Free 30-Day Exchanges</span>
              <span>&bull;</span>
              <span>📏 True-To-Fit Guarantee</span>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Soft decorative ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#EBD8C7]/40 via-transparent to-[#F1DFC9]/30 rounded-3xl blur-2xl -z-10" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7DFD4] bg-stone-100 group">
                <img
                  src={heroImage}
                  alt="Luméa modern fashion collection model"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[580px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Bewakoof style floating perk chip */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-[#E8E0D5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5A93C] text-[#1C1917] flex items-center justify-center font-black text-sm">
                    15%
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold text-[#1C1917]">TriBe Exclusive</div>
                    <div className="text-[#6D6154] text-[10px]">Instant VIP discount on all new drops</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
