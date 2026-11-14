// Valid promo codes and the discount percent each one gives.
// Keep in sync with the codes advertised in OfferBanner, CollectionPage
// and Newsletter — a code shown to shoppers must be accepted at checkout.
export const PROMO_CODES: Record<string, number> = {
  LUMEA15: 15,
  TRIBE15: 15,
};

export function getPromoDiscount(code: string): number {
  return PROMO_CODES[code.trim().toUpperCase()] ?? 0;
}
