import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E5DDD2]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8E1D7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#B85D3B] fill-[#B85D3B]" />
              <h2 className="font-serif text-2xl text-[#1C1917] font-semibold">Your Wishlist</h2>
              <span className="text-xs bg-[#EFE9DF] text-[#4A4036] px-2 py-0.5 rounded-full font-medium">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6E645A] hover:text-[#1C1917] hover:bg-[#F2ECE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#6D6357]">
                <div className="w-16 h-16 rounded-full bg-[#EFE9E0] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#A39688]" />
                </div>
                <h3 className="font-serif text-xl text-[#1C1917] font-medium mb-1">
                  No saved items yet
                </h3>
                <p className="text-xs text-[#8A7E73] max-w-xs mb-6">
                  Click the heart icon on any piece you adore to save it for later.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-sm hover:bg-[#3E352B] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E9E2D8] shadow-2xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-center rounded-lg bg-stone-100 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#1C1917] font-medium leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          className="text-[#998D80] hover:text-[#B85D3B] transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917] mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(
                          product,
                          product.colors[0]?.name || 'Standard',
                          product.sizes[0] || 'M'
                        );
                      }}
                      className="mt-2 w-full py-1.5 px-3 bg-[#1C1917] hover:bg-[#3A332C] text-white text-xs font-medium rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
