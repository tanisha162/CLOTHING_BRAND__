import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryStrip } from './components/CategoryStrip';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { Bestsellers } from './components/Bestsellers';
import { CollectionPage } from './components/CollectionPage';
import { SizeGuidePage } from './components/SizeGuidePage';
import { WhyLoveUs } from './components/WhyLoveUs';
import { EditorialBanner } from './components/EditorialBanner';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { OfferBanner } from './components/OfferBanner';

import {
  initialImages,
  defaultCategories,
  defaultProducts,
} from './data/mockData';
import { CartItem, Product, AppPage } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(defaultProducts);
  const [categories] = useState(defaultCategories);

  // Active page state
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sizeFilterForPage, setSizeFilterForPage] = useState<string | undefined>(undefined);

  // Initial cart items (matching bag badge = 2)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: defaultProducts[0],
      selectedColor: 'Sunny Mustard',
      selectedSize: 'S',
      quantity: 1,
    },
    {
      product: defaultProducts[7], // Crisp Ribbed Tank
      selectedColor: 'Crisp White',
      selectedSize: 'M',
      quantity: 1,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-dress-1', 'prod-out-1']);

  // UI state drawers and modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  // Cart total items count
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Scroll to top whenever page changes
  const handleNavigatePage = (page: AppPage, filterSize?: string) => {
    setActivePage(page);
    setSizeFilterForPage(filterSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search handler from Header or Search Modal
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, color: string, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: color,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });
    showToast(`Added ${product.name} to your bag`);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (
    productId: string,
    color: string,
    size: string,
    delta: number
  ) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string, color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
    showToast('Item removed from bag');
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  // Checkout order simulated
  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast('Order received! Thank you for shopping with Luméa.');
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#E8D8C8] selection:text-[#1C1917]">
      
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-fade-in border border-[#3C352E]">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with in-header search & category navigation */}
      <Header
        activePage={activePage}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        products={products}
        onNavigatePage={handleNavigatePage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onSearchSubmit={handleSearchSubmit}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Quick category strip (Bewakoof style) */}
      <CategoryStrip
        activePage={activePage}
        onSelectPage={handleNavigatePage}
      />

      {/* Main Dynamic View Routing */}
      <main className="flex-grow">
        {/* 1. HOME VIEW */}
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              heroImage={initialImages.hero}
              onShopNewArrivals={() => handleNavigatePage('new-arrivals')}
              onExploreBestsellers={() => handleNavigatePage('bestsellers')}
              onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            />

            {/* Big Bewakoof-Style Mega Offer & TriBe Perks Banner */}
            <OfferBanner onShopCollection={(key) => handleNavigatePage(key as AppPage)} />

            {/* Shop By Category Grid */}
            <CategoryGrid
              categories={categories}
              onSelectCategory={(key) => handleNavigatePage(key as AppPage)}
            />

            {/* Bestsellers Showcase */}
            <div id="bestsellers">
              <Bestsellers
                products={products.filter((p) => p.isBestSeller).slice(0, 4)}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setSelectedProduct(p)}
                onViewAll={() => handleNavigatePage('bestsellers')}
              />
            </div>

            {/* Why Women Love Luméa */}
            <WhyLoveUs />

            {/* Editorial Banner */}
            <EditorialBanner
              bannerImage={initialImages.editorialBanner}
              onExploreCollection={() => handleNavigatePage('dresses')}
            />

            {/* Newsletter / Community */}
            <Newsletter />
          </>
        )}

        {/* 2. NEW ARRIVALS PAGE */}
        {activePage === 'new-arrivals' && (
          <CollectionPage
            pageType="new-arrivals"
            title="New Arrivals Drops"
            subtitle="The latest vibrant drops, fresh color palettes, and limited-run silhouettes for your seasonal wardrobe."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 3. ALL BESTSELLERS PAGE */}
        {activePage === 'bestsellers' && (
          <CollectionPage
            pageType="bestsellers"
            title="All Bestsellers"
            subtitle="Our most coveted, highest-rated garments loved by thousands of women across the globe."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 4. DRESSES PAGE */}
        {activePage === 'dresses' && (
          <CollectionPage
            pageType="dresses"
            title="Dresses Collection"
            subtitle="From charming off-the-shoulder minis and bohemian beach sundresses to elegant evening cocktail wraps."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 5. TOPS & TEES PAGE */}
        {activePage === 'tops' && (
          <CollectionPage
            pageType="tops"
            title="Tops & Tees Collection"
            subtitle="Essential summer tanks, soft-washed vintage graphic tees, and romantic puff-sleeve linen blouses."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 6. OUTERWEAR PAGE */}
        {activePage === 'outerwear' && (
          <CollectionPage
            pageType="outerwear"
            title="Outerwear & Coats"
            subtitle="Tailored double-breasted trench coats, timeless vintage denim jackets, and oversized bouclé cardigans."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 7. HANDBAGS PAGE */}
        {activePage === 'handbags' && (
          <CollectionPage
            pageType="handbags"
            title="Handbags & Totes"
            subtitle="Hand-woven natural straw market totes, crescent vegan leather shoulder bags, and durable canvas crossbodies."
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {/* 8. SIZE GUIDE & FIT FINDER PAGE */}
        {activePage === 'size-guide' && (
          <SizeGuidePage
            onNavigateToCollection={(page, filterSize) => handleNavigatePage(page, filterSize)}
          />
        )}

        {/* 9. SEARCH RESULTS PAGE */}
        {activePage === 'search' && (
          <CollectionPage
            pageType="search"
            title={`Search Catalog: "${searchQuery}"`}
            subtitle={`Showing search results for styles matching "${searchQuery}". Filter by your size or sort below.`}
            searchQuery={searchQuery}
            initialSizeFilter={sizeFilterForPage}
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setSelectedProduct(p)}
            onOpenSizeGuide={() => handleNavigatePage('size-guide')}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Sliding Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => handleNavigatePage('size-guide')}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onViewAllResults={handleSearchSubmit}
        onOpenSizeGuide={() => handleNavigatePage('size-guide')}
        onNavigatePage={handleNavigatePage}
      />

      {/* User Account & Order History Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onExploreProducts={() => handleNavigatePage('home')}
      />

      {/* Deploy to Vercel & GitHub Guide Modal */}
      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

    </div>
  );
}
