import React from 'react';
import { ArrowRight } from 'lucide-react';

interface EditorialBannerProps {
  bannerImage: string;
  onExploreCollection: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({
  bannerImage,
  onExploreCollection,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F4EE] rounded-3xl overflow-hidden border border-[#E7E0D5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[500px] overflow-hidden group">
              <img
                src={bannerImage}
                alt="Dress for the Moments That Matter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
              {/* Tagline */}
              <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#877869] uppercase mb-3">
                Fashion That Moves With You
              </span>

              {/* Headline */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] text-[#1C1917] tracking-tight mb-4">
                Dress for the <br />
                <span className="italic font-normal text-[#383028]">
                  Moments That Matter.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-[#645A50] text-base sm:text-lg leading-relaxed max-w-md mb-8">
                From coffee dates to getaways — feel confident, comfortable and effortlessly you.
              </p>

              {/* CTA Button */}
              <div>
                <button
                  type="button"
                  id="editorial-explore-btn"
                  onClick={onExploreCollection}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-white text-sm font-medium tracking-wide rounded-sm hover:bg-[#38312B] transition-all duration-300 shadow-sm"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
