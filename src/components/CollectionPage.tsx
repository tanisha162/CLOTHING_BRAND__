import React, { useState, useMemo } from 'react';
import {
  Heart,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Zap,
  Check,
  Ruler,
  ChevronDown,
  X,
  Eye,
  Tag,
  Copy,
} from 'lucide-react';
import { Product, AppPage } from '../types';

interface CollectionPageProps {
  pageType: AppPage;
  title: string;
  subtitle: string;
  initialSizeFilter?: string;
  products: Product[];
  wishlistIds: string[];
  searchQuery?: string;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onNavigateHome: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  pageType,
  title,
  subtitle,
  initialSizeFilter,
  products,
  wishlistIds,
  searchQuery = '',
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onOpenSizeGuide,
  onNavigateHome,
}) => {
  // Filters & Sorting state
  const [selectedSize, setSelectedSize] = useState<string>(initialSizeFilter || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Quick selected size for individual card add-to-cart
  const [cardSelectedSizes, setCardSelectedSizes] = useState<{ [productId: string]: string }>({});

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Get base products matching pageType
  const baseCategoryProducts = useMemo(() => {
    if (pageType === 'new-arrivals') {
      return products.filter((p) => p.isNewArrival);
    }
    if (pageType === 'bestsellers') {
      return products.filter((p) => p.isBestSeller);
    }
    if (pageType === 'dresses') {
      return products.filter((p) => p.category === 'dresses');
    }
    if (pageType === 'tops') {
      return products.filter((p) => p.category === 'tops');
    }
    if (pageType === 'outerwear') {
      return products.filter((p) => p.category === 'outerwear');
    }
    if (pageType === 'handbags') {
      return products.filter((p) => p.category === 'handbags');
    }
    if (pageType === 'search') {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return products;
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q)
      );
    }
    return products;
  }, [pageType, products, searchQuery]);

  // Apply secondary filters and sorting
  const displayedProducts = useMemo(() => {
    let result = [...baseCategoryProducts];

    // Filter by size
    if (selectedSize !== 'all') {
      result = result.filter((p) => p.sizes.includes(selectedSize) || p.sizes.includes('One Size'));
    }

    // Filter by max price
    result = result.filter((p) => p.price <= maxPrice);

    // Filter only discounted
    if (onlyDiscounted) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      default:
        // featured: best sellers first
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [baseCategoryProducts, selectedSize, maxPrice, onlyDiscounted, sortBy]);

  const handleCardSizeSelect = (productId: string, size: string) => {
    setCardSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product: Product) => {
    const size = cardSelectedSizes[product.id] || product.sizes[0];
    const color = product.colors[0]?.name || 'Default';
    onAddToCart(product, color, size);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#786D62] mb-4">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#1C1917] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#1C1917] font-semibold capitalize">
            {pageType === 'search' ? `Search: "${searchQuery}"` : title}
          </span>
        </div>

        {/* Collection Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE4D8] shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F3ECE1] text-[#715438] text-xs font-bold tracking-wider uppercase">
                {displayedProducts.length} STYLES AVAILABLE
              </span>
              {pageType === 'bestsellers' && (
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase flex items-center gap-1">
                  🔥 High Demand
                </span>
              )}
              {pageType === 'new-arrivals' && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase flex items-center gap-1">
                  ✨ Just Dropped
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#6C5E50] max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Quick Size Guide CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F6EFE6] hover:bg-[#EFE4D6] text-[#4F3F2F] text-xs font-bold border border-[#DECDBB] transition-all"
            >
              <Ruler className="w-4 h-4 text-[#B85D3B]" />
              <span>Size Guide & Fit Advisor</span>
            </button>
          </div>
        </div>

        {/* BIG BEWAKOOF-STYLE VIBRANT OFFER BANNER (IMAGE 2 ENHANCEMENT) */}
        <div className="bg-gradient-to-r from-[#FDCB24] via-[#FBBF24] to-[#F59E0B] border-2 border-[#E5A000] text-[#111827] rounded-3xl p-5 sm:p-6 mb-8 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left offer headline & details */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#111827] text-[#FDCB24] text-xs font-black uppercase tracking-wider shadow-xs">
                  <Zap className="w-3.5 h-3.5 fill-[#FDCB24]" />
                  TRIBE VIP PASS OFFER
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#B85D3B] text-xs font-black uppercase border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  EXTRA 15% OFF ON THIS ENTIRE COLLECTION
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                TriBe Club Members: Flat 40% OFF + Extra 15% Auto-Savings
              </h2>

              <div className="flex items-center gap-4 text-xs font-bold text-[#3B2C13] flex-wrap pt-0.5">
                <span>⚡ Auto-Applied at Checkout</span>
                <span>&bull;</span>
                <span>🚚 Free Express Delivery</span>
                <span>&bull;</span>
                <span>🔄 30-Day Free Exchanges</span>
              </div>
            </div>

            {/* Right coupon code badge with copy button */}
            <div className="flex items-center gap-3 bg-white/95 rounded-2xl p-3 border-2 border-white shadow-sm flex-shrink-0">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C7654] block">
                  Promo Code
                </span>
                <span className="font-mono text-base font-black text-[#111827] tracking-wider">
                  TRIBE15
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode('TRIBE15')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  copiedCode === 'TRIBE15'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111827] text-[#FDCB24] hover:bg-[#282119]'
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
                    <span>COPY CODE</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE3D8] mb-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Size Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-[#554A3E] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Size:
            </span>
            {['all', 'XS', 'S', 'M', 'L', 'XL', '2XL'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedSize === s
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-[#F5EFE6] text-[#55493D] hover:bg-[#ECE2D5]'
                }`}
              >
                {s === 'all' ? 'All Sizes' : s}
              </button>
            ))}
          </div>

          {/* Right Toolbar Controls: Sort dropdown & Discount toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Discounted only */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#4D4236]">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="rounded accent-[#1C1917] cursor-pointer"
              />
              <span>On Sale Only</span>
            </label>

            <span className="text-[#DDD2C4]">|</span>

            {/* Sort Dropdown */}
            <div className="relative inline-block text-xs">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#F7F2EB] border border-[#DECDBB] rounded-xl px-3 py-1.5 pr-8 text-[#2F2720] font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#736555] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset Filters */}
            {(selectedSize !== 'all' || onlyDiscounted || sortBy !== 'featured') && (
              <button
                onClick={() => {
                  setSelectedSize('all');
                  setOnlyDiscounted(false);
                  setSortBy('featured');
                }}
                className="text-xs text-[#B85D3B] hover:text-[#8D3B1C] font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : null;
              const chosenSize = cardSelectedSizes[product.id] || product.sizes[0];

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE3D8] hover:border-[#D5C6B3] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container with Badges */}
                  <div
                    className="relative aspect-[3/4] bg-[#F4EFEA] overflow-hidden cursor-pointer"
                    onClick={() => onQuickView(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* ENLARGED TOP BADGES (Bewakoof Style) */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                      {discountPercent && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#E11D48] text-white text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                          🔥 {discountPercent}% OFF
                        </span>
                      )}
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#111827] text-[#FDCB24] text-[10px] sm:text-[11px] font-black tracking-wider uppercase shadow-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
                        isWishlisted
                          ? 'bg-red-50 text-red-600'
                          : 'bg-white/90 text-[#3C342C] hover:text-red-500 hover:bg-white'
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`}
                      />
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 py-1.5 px-3 rounded-full bg-white/95 text-[#1C1917] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 shadow-md whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Product Details (Bewakoof style) */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Rating & reviews */}
                      <div className="flex items-center gap-1 text-[11px] text-[#786D62] mb-1">
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                          <Star className="w-3 h-3 fill-emerald-700 text-emerald-700" />
                          {product.rating}
                        </span>
                        <span className="text-[#96897D]">({product.reviewsCount})</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-bold text-xs sm:text-sm text-[#1C1917] line-clamp-2 hover:text-[#B85D3B] transition-colors cursor-pointer mb-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Fabric / Fit subtitle */}
                      {product.fabric && (
                        <p className="text-[10px] text-[#8C7E70] truncate mb-2">
                          {product.fabric}
                        </p>
                      )}
                    </div>

                    {/* Pricing Block with Larger Badges */}
                    <div className="pt-2 border-t border-[#F2ECE4]">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-black text-base sm:text-lg text-[#111827]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#9E9082] line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {discountPercent && (
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Save {discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* ENLARGED TRIBE MEMBER PRICE (Bewakoof Signature Box) */}
                      {product.memberPrice && (
                        <div className="mt-2 flex items-center justify-between gap-1.5 bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-xl border border-[#FCD34D] font-bold text-xs shadow-xs">
                          <div className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706] flex-shrink-0" />
                            <span className="text-[10px] sm:text-[11px] uppercase font-black tracking-wide text-[#78350F]">TriBe Price:</span>
                          </div>
                          <span className="text-xs sm:text-sm font-black text-[#111827]">${product.memberPrice.toFixed(2)}</span>
                        </div>
                      )}

                      {/* Quick Size Selector */}
                      <div className="mt-3 flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleCardSizeSelect(product.id, sz)}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] font-bold flex items-center justify-center transition-all ${
                              chosenSize === sz
                                ? 'bg-[#1C1917] text-white'
                                : 'bg-[#F2ECE3] text-[#4A4138] hover:bg-[#E3D9CC]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Add to Bag Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(product)}
                        className="mt-2.5 w-full py-2.5 px-3 rounded-xl bg-[#1C1917] hover:bg-[#38312A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3D8]">
            <p className="text-base font-semibold text-[#1C1917]">
              No products found matching your current filter criteria.
            </p>
            <p className="text-xs text-[#7A6E63] mt-1">
              Try selecting a different size or resetting your search.
            </p>
            <button
              onClick={() => {
                setSelectedSize('all');
                setOnlyDiscounted(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
