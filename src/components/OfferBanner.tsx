import React, { useState } from 'react';
import { Zap, Tag, Copy, Check, Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

interface OfferBannerProps {
  onShopCollection?: (pageKey: string) => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ onShopCollection }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 animate-fade-in">
      {/* Big Main Bewakoof-Style Golden Offer Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FDCB24] via-[#F5B800] to-[#E5A000] border-2 border-[#E5A000] p-6 sm:p-8 lg:p-10 shadow-lg text-[#111827]">
        
        {/* Background decorative circles & watermark */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-black/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left: Big Headline & Perks */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111827] text-[#FDCB24] text-xs font-black tracking-widest uppercase shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-[#FDCB24]" />
                TRIBE VIP CLUB OFFER
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-[#B85D3B] text-xs font-black tracking-wider uppercase border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                LIMITED PERIOD FESTIVE DEALS
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight leading-tight">
              FLAT 40% OFF <span className="text-[#881337]">+ EXTRA 15%</span> FOR MEMBERS
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#2E2415] font-medium max-w-2xl leading-relaxed">
              Unlock exclusive member prices across all Dresses, Tops, Outerwear & Handbags. No minimum cart value + Free Priority Shipping!
            </p>

            {/* Quick Guarantees bar */}
            <div className="flex items-center gap-4 sm:gap-6 pt-2 text-xs font-bold text-[#3B2C13] flex-wrap">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#111827]" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#111827]" />
                <span>30-Day Free Replacements</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#111827]" />
                <span>Instant Auto-Applied TriBe Rates</span>
              </div>
            </div>
          </div>

          {/* Right: Big Interactive Promo Coupon Card */}
          <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-2xl p-5 border-2 border-white/80 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B5A47] font-bold uppercase tracking-wider mb-1">
                <span>Exclusive Coupon</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                  VERIFIED ACTIVE
                </span>
              </div>
              <div className="text-sm font-extrabold text-[#111827]">
                Extra 15% OFF On Entire Bag
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="bg-[#FAF6EE] border-2 border-dashed border-[#DFB850] rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C7654] block">
                  Coupon Code
                </span>
                <span className="font-mono text-base font-black text-[#111827] tracking-wider">
                  TRIBE15
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode('TRIBE15')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 shadow-xs ${
                  copiedCode === 'TRIBE15'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111827] text-white hover:bg-[#332C24]'
                }`}
              >
                {copiedCode === 'TRIBE15' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FDCB24]" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Action Button */}
            {onShopCollection && (
              <button
                type="button"
                onClick={() => onShopCollection('new-arrivals')}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#282119] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Shop New Arrivals With Offer</span>
                <ArrowRight className="w-4 h-4 text-[#FDCB24]" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* 3 Secondary Bewakoof-Style Mini Offer Badges Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFC8] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm flex-shrink-0">
            40%
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#111827]">Dresses Flash Sale</div>
            <div className="text-[#6D5D4E] text-[11px]">Save up to $25 on floral & maxi gowns</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFC8] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-black text-sm flex-shrink-0">
            2FOR
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#111827]">Tops & Tees Bundle</div>
            <div className="text-[#6D5D4E] text-[11px]">Buy any 2 casual tees for just $29.99</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-[#E8DFC8] flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm flex-shrink-0">
            FREE
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#111827]">Express Delivery Pass</div>
            <div className="text-[#6D5D4E] text-[11px]">Zero shipping on all orders over $50</div>
          </div>
        </div>
      </div>
    </div>
  );
};
