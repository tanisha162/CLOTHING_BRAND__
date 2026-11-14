import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { getPromoDiscount } from '../utils/promo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, color: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, color: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 75.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 8.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = getPromoDiscount(promoCode);
    if (discount > 0) {
      setDiscountPercent(discount);
      setPromoMessage({ type: 'success', text: `${discount}% discount applied!` });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "LUMEA15" or "TRIBE15"' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E5DDD2]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8E1D7] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C1917]" />
              <h2 className="font-serif text-2xl text-[#1C1917] font-semibold">Your Bag</h2>
              <span className="text-xs bg-[#EFE9DF] text-[#4A4036] px-2 py-0.5 rounded-full font-medium">
                {cartItems.reduce((total, i) => total + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6E645A] hover:text-[#1C1917] hover:bg-[#F2ECE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F3ECE3] px-5 py-3 border-b border-[#E6DDD1]">
            <div className="flex items-center justify-between text-xs text-[#3E342B] font-medium mb-1.5">
              {isFreeShipping ? (
                <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Free standard shipping unlocked!
                </span>
              ) : (
                <span>
                  Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more for <strong>Free Shipping</strong>
                </span>
              )}
              <span className="text-[11px] text-[#786D61]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#DFD5C7] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1C1917] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#6D6357]">
                <div className="w-16 h-16 rounded-full bg-[#EFE9E0] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#A39688]" />
                </div>
                <h3 className="font-serif text-xl text-[#1C1917] font-medium mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#8A7E73] max-w-xs mb-6">
                  Looks like you haven't added any pieces yet. Explore our curated arrivals.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded-sm hover:bg-[#3E352B] transition-colors"
                >
                  Discover Bestsellers
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E9E2D8] shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-center rounded-lg bg-stone-100 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#1C1917] font-medium leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            onRemoveItem(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="text-[#998D80] hover:text-[#B85D3B] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#7A6F64] mt-0.5">
                        Color: <span className="font-medium text-[#2E2822]">{item.selectedColor}</span> | Size:{' '}
                        <span className="font-medium text-[#2E2822]">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-[#DCD2C5] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              -1
                            )
                          }
                          className="p-1 text-[#655A4F] hover:text-[#1C1917] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              1
                            )
                          }
                          className="p-1 text-[#655A4F] hover:text-[#1C1917] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-semibold text-[#1C1917]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E8E1D7] space-y-4">
              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8D80]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. TRIBE15)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-[#FAF8F5] border border-[#D5C9BC] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1C1917]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#EAE2D7] text-[#1C1917] border border-[#D5C9BC] text-xs font-semibold rounded-sm transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] ${
                    promoMessage.type === 'success' ? 'text-emerald-700' : 'text-[#B85D3B]'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C5248] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917] font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-2 border-t border-[#EFE8DE]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#342D26] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
