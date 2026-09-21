import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E7DFD4] z-10 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4036] hover:text-[#1C1917] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Product Image Column */}
          <div className="md:col-span-6 bg-[#EDE5DB] relative min-h-[360px] md:min-h-[480px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#1C1917] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#85776A] font-semibold">
                  Luméa Collection
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-semibold mt-1">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#DF9B35]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#7A7065]">
                    5.0 ({product.reviewsCount.toLocaleString()} verified reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#1C1917]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#94897E] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs bg-[#EAE2D7] text-[#4A4036] px-2 py-0.5 rounded font-medium">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5F544A] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="text-xs font-semibold text-[#1C1917] block mb-2">
                  Color: <span className="font-normal text-[#594E44]">{selectedColor}</span>
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

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#1C1917]">
                    Size: <span className="font-normal text-[#594E44]">{selectedSize}</span>
                  </label>
                  <button className="text-[11px] text-[#7A6E63] underline hover:text-[#1C1917]">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 rounded-md text-xs font-medium border flex items-center justify-center transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#1C1917] text-white border-[#1C1917]'
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
                  className={`flex-1 py-3.5 px-6 rounded-sm text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
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
                      <span>Add to Bag - ${(product.price).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-sm border transition-colors ${
                    isWishlisted
                      ? 'bg-[#B85D3B] text-white border-[#B85D3B]'
                      : 'border-[#D8CFC3] text-[#3A332B] hover:bg-[#EFE9DF]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EAE3D8] text-[10px] text-[#7A6F64] text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>Free shipping $75+</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>30-day returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E4338]" />
                  <span>100% Cotton & Linen</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
