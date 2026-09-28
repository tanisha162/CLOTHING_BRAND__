import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  Zap,
} from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onOpenSizeGuide?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E7DFD4] z-10 my-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4036] hover:text-[#1C1917] transition-colors shadow-sm"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
          {/* Product Image Column */}
          <div className="md:col-span-6 bg-[#EDE5DB] relative min-h-[320px] md:min-h-[460px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-[#1C1917] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              {discountPercent && (
                <span className="bg-[#B85D3B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#85776A] font-bold">
                  Luméa Brand &bull; {product.category.toUpperCase()}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-bold mt-1">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#DF9B35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#7A7065] font-semibold">
                    {product.rating} ({product.reviewsCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price & TriBe offer */}
                <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-2xl font-bold text-[#1C1917]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#94897E] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* TriBe Member Price (Bewakoof style) */}
                {product.memberPrice && (
                  <div className="mt-3 flex items-center justify-between gap-2 text-xs font-bold text-[#111827] bg-[#FEF3C7] px-4 py-2.5 rounded-2xl border-2 border-[#FCD34D] shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#D97706] fill-[#D97706] flex-shrink-0" />
                      <span className="font-black text-xs uppercase tracking-wide text-[#78350F]">TriBe VIP Club Price:</span>
                    </div>
                    <span className="text-base font-black text-[#111827]">${product.memberPrice.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Description & Fabric */}
              <p className="text-xs sm:text-sm text-[#5F544A] leading-relaxed">
                {product.description}
              </p>

              {product.fabric && (
                <div className="text-xs text-[#756658] bg-[#F2EDE5] p-2.5 rounded-xl">
                  <strong>Fabric & Cut:</strong> {product.fabric} &bull; {product.fit || 'Regular Fit'}
                </div>
              )}

              {/* Color Selection */}
              <div>
                <label className="text-xs font-bold text-[#1C1917] block mb-2">
                  Color: <span className="font-medium text-[#6B5E52]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border transition-transform ${
                        selectedColor === c.name
                          ? 'ring-2 ring-offset-2 ring-[#1C1917] scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: c.hex,
                        borderColor: c.hex.toLowerCase() === '#ffffff' ? '#D6CCC0' : c.hex,
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection with Direct Size Guide Link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#1C1917]">
                    Size: <span className="font-medium text-[#6B5E52]">{selectedSize}</span>
                  </label>
                  {onOpenSizeGuide && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSizeGuide();
                      }}
                      className="text-xs text-[#B85D3B] hover:text-[#8D3B1C] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide & Fit Advisor</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-9 h-9 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                          : 'bg-white text-[#2F2923] border-[#D8CFC3] hover:border-[#1C1917]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md ${
                    justAdded
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#1C1917] hover:bg-[#38312A] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${product.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition-colors shadow-xs ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'border-[#D8CFC3] text-[#3A332B] hover:bg-[#EFE9DF]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EAE3D8] text-[10px] text-[#7A6F64] text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>Free shipping $50+</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>30-Day Free Exchanges</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>100% Genuine Quality</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
