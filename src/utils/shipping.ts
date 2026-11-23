// Shipping rules for the store — single source of truth.
// The cart (CartDrawer) and every shipping promise shown to shoppers
// (OfferBanner, Header, ProductModal, WhyLoveUs) must agree with these
// numbers: the banner once promised free shipping over $50 while the bag
// only grants it over $75, so a $60 order was charged $8 shipping
// despite the promise. Render the threshold from this constant instead
// of hard-coding a dollar figure in a component.
export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING_COST = 8;

// Flat $8 shipping below the free-shipping threshold; nothing to ship
// (or nothing left to pay for) at or above it, and an empty bag ships free.
export function getShippingCost(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return STANDARD_SHIPPING_COST;
}

export function isFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}
