import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, ArrowRight, Eye, Check, Zap } from 'lucide-react';
import { Product } from '../types';

interface BestsellersProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onQuickView: (product: Product) => void;
  onViewAll?: () => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onViewAll,
}) => {
  // Store selected color for each product card
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      initial[p.id] = p.colors[0]?.name || '';
    });
    return initial;
  });

  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const color = selectedColors[product.id] || product.colors[0]?.name || 'Standard';
    const size = product.sizes[0] || 'M';
    onAddToCart(product, color, size);

    setAddedItemEffect(product.id);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#EAE4DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Centered / Left Title Area */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
              <span className="w-6 h-[1px] bg-[#C5BAAF]" />
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal tracking-tight">
                Bestsellers
              </h2>
              <span className="w-6 h-[1px] bg-[#C5BAAF]" />
            </div>
            <p className="text-sm text-[#73685C]">Loved by women everywhere</p>
          </div>

          {/* View All Link */}
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1C1917] hover:text-[#B85D3B] transition-colors group cursor-pointer"
          >
            <span className="underline decoration-[#1C1917]/30 hover:decoration-[#B85D3B]">View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Column Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const activeColorName = selectedColors[product.id] || product.colors[0]?.name;
            const isJustAdded = addedItemEffect === product.id;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white rounded-2xl p-3 sm:p-3.5 border border-[#EAE3D8] hover:border-[#D6CCC0] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image Section */}
                <div
                  className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#F2EDE5] cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges (Bewakoof style) */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#E11D48] text-white text-[10px] font-black tracking-wider uppercase shadow-xs">
                        🔥 {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#111827] text-[#FDCB24] text-[9px] font-black tracking-wider uppercase shadow-xs">
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                      isWishlisted
                        ? 'bg-[#B85D3B] text-white'
                        : 'bg-white/90 text-[#3C352E] hover:bg-white hover:text-[#B85D3B]'
                    }`}
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Hover Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-full py-2 bg-white/95 hover:bg-white text-[#1C1917] text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 backdrop-blur-sm transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="pt-4 px-1 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif text-lg sm:text-xl text-[#1C1917] font-medium leading-snug cursor-pointer hover:text-[#B85D3B] transition-colors"
                    >
                      {product.name}
                    </h3>

                    {/* Star Rating & Review count */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-[#DF9B35]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-[#7A7065] font-normal">
                        ({product.reviewsCount.toLocaleString()})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-black text-[#1C1917]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#9B9084] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* TriBe Member Price */}
                    {product.memberPrice && (
                      <div className="mt-2 flex items-center justify-between gap-1.5 bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-xl border border-[#FCD34D] font-bold text-xs shadow-2xs">
                        <div className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706] flex-shrink-0" />
                          <span className="text-[10px] uppercase font-black text-[#78350F]">TriBe Price:</span>
                        </div>
                        <span className="text-xs font-black text-[#111827]">${product.memberPrice.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      {product.colors.map((color) => {
                        const isSelected = activeColorName === color.name;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            onClick={(e) => handleColorSelect(product.id, color.name, e)}
                            className={`w-4 h-4 rounded-full transition-transform border ${
                              isSelected
                                ? 'ring-2 ring-offset-2 ring-[#1C1917] scale-110'
                                : 'hover:scale-110 opacity-90'
                            }`}
                            style={{
                              backgroundColor: color.hex,
                              borderColor: color.hex.toLowerCase() === '#ffffff' ? '#D6CCC0' : color.hex,
                            }}
                            title={color.name}
                            aria-label={`Select color ${color.name}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`w-full py-2.5 px-4 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isJustAdded
                        ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                        : 'border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white bg-transparent'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
