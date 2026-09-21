import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { Bestsellers } from './components/Bestsellers';
import { WhyLoveUs } from './components/WhyLoveUs';
import { EditorialBanner } from './components/EditorialBanner';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';

import {
  initialImages,
  defaultCategories,
  defaultProducts,
} from './data/mockData';
import { CartItem, Product } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(defaultProducts);
  const [categories] = useState(defaultCategories);

  // Initial cart items (2 items matching the screenshot's bag badge = 2)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: defaultProducts[0],
      selectedColor: 'Sunny Mustard',
      selectedSize: 'S',
      quantity: 1,
    },
    {
      product: defaultProducts[1],
      selectedColor: 'Crisp White',
      selectedSize: 'M',
      quantity: 1,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1']);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // UI state drawers and modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  // Category filter selection
  const handleSelectCategory = (categoryKey: string) => {
    setActiveCategoryFilter(categoryKey);
    const bestsellersElement = document.getElementById('bestsellers');
    if (bestsellersElement) {
      bestsellersElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered products based on selected category
  const filteredProducts = useMemo(() => {
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'sale') {
      return products;
    }
    return products.filter((p) => p.category === activeCategoryFilter);
  }, [products, activeCategoryFilter]);

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
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-fade-in border border-[#3C352E]">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          heroImage={initialImages.hero}
          onShopNewArrivals={() => handleSelectCategory('all')}
        />

        {/* Shop By Category */}
        <CategoryGrid
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />

        {/* Category Filter Pills when active */}
        <div id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
            {[
              { label: 'All Bestsellers', key: 'all' },
              { label: 'Dresses', key: 'dresses' },
              { label: 'Tops', key: 'tops' },
              { label: 'Outerwear', key: 'outerwear' },
              { label: 'Handbags', key: 'handbags' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategoryFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategoryFilter === tab.key
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-[#EDE5DA] text-[#4F4439] hover:bg-[#E3D9CC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bestsellers Section */}
        <Bestsellers
          products={filteredProducts.length > 0 ? filteredProducts : products}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Why Women Love Luméa */}
        <WhyLoveUs />

        {/* Editorial Banner */}
        <EditorialBanner
          bannerImage={initialImages.editorialBanner}
          onExploreCollection={() => handleSelectCategory('dresses')}
        />

        {/* Newsletter / Community */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

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
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Deploy to Vercel & GitHub Guide Modal */}
      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

    </div>
  );
}
