import React, { useState } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Truck,
  GitBranch,
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenDeployGuide: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenDeployGuide,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'New In', key: 'all' },
    { name: 'Women', key: 'all', hasDropdown: true },
    { name: 'Dresses', key: 'dresses', hasDropdown: true },
    { name: 'Tops', key: 'tops', hasDropdown: true },
    { name: 'Bottoms', key: 'bottoms', hasDropdown: true },
    { name: 'Sale', key: 'sale', isSale: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DF] transition-all">
      {/* Top announcement bar */}
      <div className="bg-[#EDE6DE] text-[#4A423B] px-4 py-2 text-xs md:text-sm font-medium border-b border-[#E3DBD2]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 justify-center w-full sm:w-auto">
            <Truck className="w-4 h-4 text-[#8A6D53]" />
            <span>
              Free Shipping on Orders Over <strong>$75</strong>
            </span>
            <span className="hidden md:inline text-[#C0B3A6]">|</span>
            <span className="hidden md:inline">Easy 30-Day Returns</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onOpenDeployGuide}
              className="inline-flex items-center gap-1 text-[#665646] hover:text-[#1C1917] transition-colors font-semibold"
              title="Guide to push on GitHub & deploy to Vercel"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Vercel & GitHub Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex flex-col items-start cursor-pointer group">
            <a href="#" className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1C1917] font-semibold">
                Luméa
              </span>
              <span className="text-[9px] tracking-[0.28em] text-[#786E65] uppercase -mt-0.5 font-sans font-medium">
                Wear Your Story
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => onSelectCategory && onSelectCategory(item.key)}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                  item.isSale
                    ? 'text-[#B85D3B] hover:text-[#934529] font-semibold'
                    : 'text-[#3E3832] hover:text-[#1C1917]'
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-[#8E8377] transition-transform duration-200 group-hover:rotate-180" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search */}
            <button
              type="button"
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2]"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2] relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B85D3B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              type="button"
              id="header-account-btn"
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2] hidden sm:block"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag */}
            <button
              type="button"
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-[#2D2823] hover:text-black transition-colors rounded-full hover:bg-[#EFEAE2] relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#1C1917] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE5DF] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-md text-base font-medium ${
                  item.isSale
                    ? 'text-[#B85D3B] font-semibold'
                    : 'text-[#2D2823] hover:bg-[#EFE9DF]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE5DF] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDeployGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-[#1C1917] text-white text-sm font-medium"
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
