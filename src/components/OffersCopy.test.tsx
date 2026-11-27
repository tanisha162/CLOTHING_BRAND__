// Regression test for the advertised-offers bug: the store promised
// "FLAT 40% OFF", "Free Priority Shipping" with "No minimum cart value",
// "Buy any 2 casual tees for just $29.99" and an "Auto-Applied" discount,
// but the catalog and checkout disagreed on every one — no product is
// 40% off (discounts run 29–34%), shipping is $8 under $75, the two
// cheapest tees cost $35.49, and the 15% code must be typed in by hand.
// The copy now states what checkout actually gives. If the catalog ever
// gains a genuine 40%-off product, this test fails and the headline must
// be revisited. Run with: npx tsx src/components/OffersCopy.test.tsx
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { getShippingCost, FREE_SHIPPING_THRESHOLD } from '../utils/shipping';
import { getPromoDiscount } from '../utils/promo';

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
});
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

const React = await import('react');
const { act } = React;
const { createRoot } = await import('react-dom/client');
const { Header } = await import('./Header');
const { OfferBanner } = await import('./OfferBanner');
const { CollectionPage } = await import('./CollectionPage');

const container = document.getElementById('root')!;
const root = createRoot(container);
const noop = () => {};

const render = (el: React.ReactElement) =>
  act(() => {
    root.render(el);
  });
const text = () => container.textContent ?? '';
const assertNoFalseClaim = (label: string) => {
  for (const claim of ['40% OFF', 'Flat 40', 'FLAT 40', 'No minimum', 'Free Priority Shipping', 'Free Express Delivery', 'Auto-Applied', '$29.99', '2FOR']) {
    assert.ok(!text().includes(claim), `${label} must not promise "${claim}"`);
  }
};

// 1. The catalog facts the copy must match. mockData imports image files,
// so it cannot be imported under tsx — read the prices out of the source.
const source = readFileSync('src/data/mockData.ts', 'utf8');
const pairs = [...source.matchAll(/price:\s*([\d.]+),\s*\n\s*originalPrice:\s*([\d.]+)/g)];
assert.ok(pairs.length > 0, 'catalog should have discounted products');
const discounts = pairs.map(([, price, orig]) =>
  Math.round(((Number(orig) - Number(price)) / Number(orig)) * 100)
);
const maxDiscount = Math.max(...discounts);
assert.ok(Math.min(...discounts) >= 29, `smallest discount should be >= 29%, got ${Math.min(...discounts)}%`);
assert.equal(maxDiscount, 34, `largest catalog discount should be 34%, got ${maxDiscount}%`);

// The two cheapest tops cost more than the old "$29.99 for any 2" promise.
const blocks = source.split(/\n  \{\n    id:/).slice(1);
const topPrices = blocks
  .filter((b) => b.includes("category: 'tops'"))
  .map((b) => Number(b.match(/price:\s*([\d.]+)/)![1]))
  .sort((a, b) => a - b);
assert.ok(topPrices.length >= 2, 'catalog should have at least two tops');
assert.ok(
  topPrices[0] + topPrices[1] > 29.99,
  `two cheapest tops should cost more than $29.99, got $${(topPrices[0] + topPrices[1]).toFixed(2)}`
);

// 2. The checkout facts: $8 shipping under $75, and TRIBE15 is a real
// 15% code — but only when the shopper types it in (nothing auto-applies).
assert.equal(FREE_SHIPPING_THRESHOLD, 75);
assert.equal(getShippingCost(60), 8, 'a $60 order is charged shipping');
assert.equal(getShippingCost(75), 0);
assert.equal(getPromoDiscount('TRIBE15'), 15);

// 3. The rendered copy states those facts and nothing false.
render(
  React.createElement(Header, {
    activePage: 'home',
    cartCount: 2,
    wishlistCount: 2,
    products: [],
    onNavigatePage: noop,
    onOpenCart: noop,
    onOpenWishlist: noop,
    onOpenSearch: noop,
    onOpenAccount: noop,
    onOpenDeployGuide: noop,
    onSearchSubmit: noop,
    onSelectProduct: noop,
  })
);
assert.ok(text().includes('34% OFF'), 'header should advertise the true top discount');
assertNoFalseClaim('Header');

render(React.createElement(OfferBanner, { onShopCollection: noop }));
assert.ok(text().includes('34% OFF'), 'banner should advertise the true top discount');
assert.ok(text().includes('Free shipping on orders over $75'), 'banner should state the real shipping rule');
assert.ok(text().includes('from just $16.99'), 'banner should price tees from the cheapest top');
assertNoFalseClaim('OfferBanner');

render(
  React.createElement(CollectionPage, {
    pageType: 'new-arrivals',
    title: 'New Arrivals Drops',
    subtitle: '',
    products: [],
    wishlistIds: [],
    onToggleWishlist: noop,
    onAddToCart: noop,
    onQuickView: noop,
    onOpenSizeGuide: noop,
    onNavigateHome: noop,
  })
);
assert.ok(text().includes('Up to 34% OFF'), 'collection banner should advertise the true top discount');
assert.ok(text().includes('Use Code TRIBE15 at Checkout'), 'collection banner should say the code must be entered');
assert.ok(text().includes('Free Shipping Over $75'), 'collection banner should state the real shipping rule');
assertNoFalseClaim('CollectionPage');

console.log('OffersCopy.test.tsx: all assertions passed');
