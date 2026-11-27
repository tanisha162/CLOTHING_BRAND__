import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Ruler,
  Truck,
  GitBranch,
  Sparkles,
  Zap,
  ArrowRight,
  Flame,
  Star,
} from 'lucide-react';
import { AppPage, Product } from '../types';
import { matchesSearch } from '../utils/search';

interface HeaderProps {
  activePage: AppPage;
  cartCount: number;
  wishlistCount: number;
  products?: Product[];
  onNavigatePage: (page: AppPage) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenDeployGuide: () => void;
  onSearchSubmit: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  cartCount,
  wishlistCount,
  products = [],
  onNavigatePage,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenDeployGuide,
  onSearchSubmit,
  onSelectProduct,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live results for autocomplete
  const searchResults = React.useMemo(() => {
    const q = headerSearchQuery.toLowerCase().trim();
    if (!q) return [];
    return products.filter((p) => matchesSearch(p, headerSearchQuery)).slice(0, 6);
  }, [products, headerSearchQuery]);

  // Featured trending clothes for the search popup
  const trendingClothes = React.useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (headerSearchQuery.trim()) {
      onSearchSubmit(headerSearchQuery.trim());
      setIsSearchFocused(false);
    }
  };

  const navItems: {
    page: AppPage;
    label: string;
    badge?: string;
    isHot?: boolean;
    isNew?: boolean;
    icon?: React.ReactNode;
  }[] = [
    { page: 'new-arrivals', label: 'New Arrivals', badge: 'NEW', isNew: true },
    { page: 'bestsellers', label: 'All Bestsellers', badge: 'HOT', isHot: true },
    { page: 'dresses', label: 'Dresses' },
    { page: 'tops', label: 'Tops' },
    { page: 'outerwear', label: 'Outerwear' },
    { page: 'handbags', label: 'Handbags' },
    {
      page: 'size-guide',
      label: 'Size Guide',
      icon: <Ruler className="w-3.5 h-3.5 text-[#B85D3B]" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DF] transition-all">
      {/* Top announcement bar - Bewakoof style vibrant TriBe offers */}
      <div className="bg-[#1C1917] text-white px-4 py-2 text-xs font-semibold border-b border-[#383028]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Main Left Offer Badge */}
          <div className="flex items-center gap-2.5 justify-center w-full sm:w-auto text-xs">
            <span className="bg-[#FDCB24] text-[#111827] px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-[#111827]" /> TRIBE VIP PASS
            </span>
            <span className="text-[#FAF5EE]">
              UP TO <strong>34% OFF</strong> + Extra <strong>15% VIP Discount</strong> on all collections
            </span>
          </div>

          {/* Right Links & Guarantees */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:flex items-center gap-1 text-[#E0D5C7]">
              <Truck className="w-3.5 h-3.5 text-[#FDCB24]" />
              <span>Free Shipping $75+</span>
            </span>
            <button
              type="button"
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-1 text-[#FDCB24] hover:text-white transition-colors font-bold"
              title="Guide to push on GitHub & deploy to Vercel"
            >
              <GitBranch className="w-3 h-3 text-emerald-400" />
              <span>GitHub / Vercel Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#2B2723] hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo (Click takes to Home) */}
          <div
            onClick={() => onNavigatePage('home')}
            className="flex-shrink-0 flex flex-col items-start cursor-pointer group select-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C1917] font-extrabold group-hover:text-[#B85D3B] transition-colors">
              Luméa
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#786E65] uppercase font-sans font-bold">
              Wear Your Story
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => onNavigatePage(item.page)}
                  className={`inline-flex items-center gap-1.5 text-xs 2xl:text-sm font-bold transition-all py-1.5 px-2 rounded-lg relative ${
                    isActive
                      ? 'text-[#1C1917] font-black'
                      : 'text-[#4A4036] hover:text-[#1C1917] hover:bg-[#EFE8DD]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                        item.isHot
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1C1917] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bewakoof In-Header Search Bar (Desktop & Large screens) */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-grow max-w-sm lg:max-w-md xl:max-w-lg relative"
          >
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search dresses, tops, outerwear, bags..."
                value={headerSearchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setHeaderSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                className="w-full bg-[#EFE9DF] hover:bg-[#EAE2D6] focus:bg-white text-xs sm:text-sm text-[#1C1917] placeholder-[#8A7D71] pl-10 pr-9 py-2.5 rounded-full border border-transparent focus:border-[#C4B4A2] focus:outline-none transition-all shadow-inner font-medium"
              />
              <Search className="w-4 h-4 text-[#7A6D60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />

              {headerSearchQuery && (
                <button
                  type="button"
                  onClick={() => setHeaderSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7D71] hover:text-black p-1 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* EXPANDED MEGA SEARCH DROPDOWN (Fixes narrow width in Image 1!) */}
            {isSearchFocused && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[92vw] sm:w-[580px] md:w-[680px] lg:w-[740px] bg-white rounded-3xl shadow-2xl border border-[#DFD3C3] p-5 sm:p-6 z-50 animate-fade-in max-h-[85vh] overflow-y-auto">
                
                {headerSearchQuery.trim() ? (
                  /* --- REAL-TIME MATCHING RESULTS --- */
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] mb-3">
                      <div className="text-xs font-bold text-[#6D5D4E] uppercase tracking-wider">
                        Matching Results ({searchResults.length})
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="text-xs font-bold text-[#B85D3B] hover:text-[#914325] flex items-center gap-1"
                      >
                        <span>View All & Filter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              if (onSelectProduct) onSelectProduct(product);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-2xl border border-[#EDE5DA] hover:border-[#1C1917] hover:bg-[#FAF6F0] cursor-pointer transition-all group"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-14 h-16 object-cover rounded-xl bg-[#F4EFEA] flex-shrink-0"
                            />
                            <div className="flex-grow min-w-0">
                              {product.badge && (
                                <span className="text-[9px] font-bold text-[#B85D3B] uppercase tracking-wider block">
                                  {product.badge}
                                </span>
                              )}
                              <h4 className="text-xs font-bold text-[#1C1917] truncate group-hover:text-[#B85D3B]">
                                {product.name}
                              </h4>
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-xs font-black text-[#1C1917]">
                                  ${product.price.toFixed(2)}
                                </span>
                                {product.memberPrice && (
                                  <span className="text-[10px] text-[#8C5E28] bg-[#FBF3E8] px-1.5 py-0.2 rounded font-bold">
                                    ⚡ ${product.memberPrice.toFixed(2)} TriBe
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-xs text-[#7A6E63]">
                        No direct matches found for &quot;{headerSearchQuery}&quot;. Press Enter to browse the full catalog.
                      </div>
                    )}
                  </div>
                ) : (
                  /* --- EMPTY STATE: BROWSE VARIOUS CLOTHS & CATEGORIES (IMAGE 1 UPGRADE) --- */
                  <div className="space-y-5">
                    
                    {/* 1. Quick Visual Categories with Photos */}
                    <div>
                      <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                        <span>Shop By Category</span>
                        <span className="text-[10px] text-[#A89A8B] font-semibold">1-Click Browse</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[
                          { key: 'dresses', label: 'Dresses', icon: '👗' },
                          { key: 'tops', label: 'Tops & Tees', icon: '👚' },
                          { key: 'outerwear', label: 'Outerwear', icon: '🧥' },
                          { key: 'handbags', label: 'Handbags', icon: '👜' },
                          { key: 'bestsellers', label: 'Bestsellers', icon: '🔥' },
                          { key: 'new-arrivals', label: 'New Drops', icon: '✨' },
                        ].map((cat) => (
                          <button
                            key={cat.key}
                            type="button"
                            onClick={() => {
                              onNavigatePage(cat.key as AppPage);
                              setIsSearchFocused(false);
                            }}
                            className="p-2.5 rounded-2xl bg-[#F7F2EB] hover:bg-[#1C1917] hover:text-white transition-all text-center group border border-[#EDE5DA]"
                          >
                            <span className="text-xl block mb-1">{cat.icon}</span>
                            <span className="text-[11px] font-bold block truncate">
                              {cat.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Popular Search Term Pills (Spacious & Wrapped) */}
                    <div>
                      <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2">
                        Popular Searches
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Floral Summer Dress',
                          'Streetwear Graphic Tee',
                          'Camel Trench Coat',
                          'Woven Straw Tote',
                          'Linen Peasant Blouse',
                          'Ribbed Knit Midi',
                          'Denim Trucker Jacket',
                          'All Bestsellers',
                        ].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => {
                              // "All Bestsellers" is a shortcut to the
                              // bestsellers page, not a search phrase —
                              // searching for it literally matches nothing.
                              if (term === 'All Bestsellers') {
                                onNavigatePage('bestsellers');
                              } else {
                                setHeaderSearchQuery(term);
                                onSearchSubmit(term);
                              }
                              setIsSearchFocused(false);
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#F5EFE6] hover:bg-[#1C1917] hover:text-white text-[#4A4036] text-xs font-bold transition-all border border-[#DFD5C6]"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Featured Trending Clothes Showcase (Bewakoof style) */}
                    <div>
                      <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                        <span>🔥 Trending Clothes Right Now</span>
                        <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                          HOT SELECTION
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {trendingClothes.map((cloth) => (
                          <div
                            key={cloth.id}
                            onClick={() => {
                              if (onSelectProduct) onSelectProduct(cloth);
                              setIsSearchFocused(false);
                            }}
                            className="bg-[#FAF7F2] rounded-2xl p-2 border border-[#EAE3D7] hover:border-[#1C1917] hover:shadow-md transition-all cursor-pointer group"
                          >
                            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-stone-100 relative">
                              <img
                                src={cloth.image}
                                alt={cloth.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              {cloth.badge && (
                                <span className="absolute top-1.5 left-1.5 bg-[#1C1917] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                                  {cloth.badge}
                                </span>
                              )}
                            </div>
                            <h5 className="text-[11px] font-bold text-[#1C1917] truncate group-hover:text-[#B85D3B]">
                              {cloth.name}
                            </h5>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-xs font-black text-[#1C1917]">
                                ${cloth.price.toFixed(2)}
                              </span>
                              {cloth.memberPrice && (
                                <span className="text-[9px] text-[#8C5E28] font-bold">
                                  ⚡ ${cloth.memberPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Bottom Fit & Size Advisor Shortcut */}
                    <div className="border-t border-[#F0EAE1] pt-3 flex items-center justify-between text-xs text-[#6B5E52]">
                      <span className="text-[11px]">Unsure about sizing?</span>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigatePage('size-guide');
                          setIsSearchFocused(false);
                        }}
                        className="text-[#B85D3B] font-bold hover:underline flex items-center gap-1"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Interactive Size & Fit Calculator</span>
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile search button */}
            <button
              type="button"
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#2D2823] hover:text-black md:hidden transition-colors rounded-full hover:bg-[#EFEAE2]"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist with count badge */}
            <button
              type="button"
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2] relative"
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B85D3B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Orders */}
            <button
              type="button"
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2]"
              aria-label="User account"
              title="My Account & Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag with count badge */}
            <button
              type="button"
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2] relative flex items-center gap-1"
              aria-label="Shopping Bag"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="bg-[#1C1917] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE5DF] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          {/* Mobile search bar */}
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setMobileMenuOpen(false);
            }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search dresses, tops, outerwear..."
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
              className="w-full bg-[#EFE9DF] text-xs text-[#1C1917] pl-8 pr-4 py-2.5 rounded-xl border border-[#DDD2C4] focus:outline-none font-medium"
            />
            <Search className="w-4 h-4 text-[#7A6D60] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                onNavigatePage('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg text-sm font-bold ${
                activePage === 'home' ? 'bg-[#1C1917] text-white' : 'text-[#2D2823] hover:bg-[#EFE9DF]'
              }`}
            >
              ✨ Home & All Collections
            </button>

            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigatePage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-between ${
                  activePage === item.page
                    ? 'bg-[#1C1917] text-white'
                    : 'text-[#2D2823] hover:bg-[#EFE9DF]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                      activePage === item.page
                        ? 'bg-[#E5A93C] text-[#1C1917]'
                        : item.isHot
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE5DF] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAccount();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#EDE5DB] text-[#1C1917] text-xs font-bold"
            >
              <User className="w-4 h-4 text-[#B85D3B]" />
              <span>My Account & Orders</span>
            </button>
            <button
              onClick={() => {
                onOpenDeployGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#1C1917] text-white text-xs font-bold"
            >
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span>Deploy to Vercel & GitHub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
