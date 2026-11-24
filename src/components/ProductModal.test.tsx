// Regression test for the ProductModal selection bug: the modal used to
// call its useState hooks after `if (!isOpen || !product) return null`
// (breaking the Rules of Hooks), and it kept the colour/size picked for
// one product when another product was shown, so a One Size tote could
// be added to the bag in size XL and the previous product's colour.
// Run with: npx tsx src/components/ProductModal.test.tsx
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

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
const { ProductModal } = await import('./ProductModal');
import type { Product } from '../types';

const dress: Product = {
  id: 'prod-dress-1',
  name: 'Floral Maxi Dress',
  category: 'dresses',
  price: 49.99,
  originalPrice: 69.99,
  rating: 4.8,
  reviewsCount: 120,
  image: 'dress.jpg',
  description: 'A dress.',
  colors: [
    { name: 'Red', hex: '#ff0000' },
    { name: 'Blue', hex: '#0000ff' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
};

const tote: Product = {
  id: 'prod-bag-1',
  name: 'Straw Tote',
  category: 'handbags',
  price: 39.99,
  rating: 4.5,
  reviewsCount: 80,
  image: 'bag.jpg',
  description: 'A tote.',
  colors: [{ name: 'Natural', hex: '#c8a165' }],
  sizes: ['One Size'],
};

const container = document.getElementById('root')!;
const root = createRoot(container);
const noop = () => {};
const added: Array<{ product: Product; color: string; size: string }> = [];
const onAddToCart = (p: Product, color: string, size: string) => {
  added.push({ product: p, color, size });
};

const renderModal = (product: Product | null, isOpen: boolean) =>
  act(() => {
    root.render(
      React.createElement(ProductModal, {
        product,
        isOpen,
        onClose: noop,
        isWishlisted: false,
        onToggleWishlist: noop,
        onAddToCart,
      })
    );
  });

const sizeLabel = () =>
  [...container.querySelectorAll('label')]
    .map((l) => l.textContent)
    .find((t) => t?.startsWith('Size:'));
const colorLabel = () =>
  [...container.querySelectorAll('label')]
    .map((l) => l.textContent)
    .find((t) => t?.startsWith('Color:'));
const clickButton = (text: string) =>
  act(() => {
    const btn = [...container.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === text
    );
    assert.ok(btn, `button "${text}" should exist`);
    btn!.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  });
const clickAddToBag = () =>
  act(() => {
    const btn = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Add to Bag')
    );
    assert.ok(btn, 'Add to Bag button should exist');
    btn!.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  });

// 1. Opening the modal after it rendered closed must not crash (hooks
// previously ran after the early return, changing the hook count).
renderModal(null, false);
renderModal(dress, true);
assert.ok(container.textContent?.includes('Floral Maxi Dress'));
assert.equal(sizeLabel(), 'Size: XS');
assert.equal(colorLabel(), 'Color: Red');

// 2. Picking a size/colour, then showing another product while the modal
// stays open, must reset the selection to that product's own options.
clickButton('XL');
assert.equal(sizeLabel(), 'Size: XL');
renderModal(tote, true);
assert.equal(sizeLabel(), 'Size: One Size');
assert.equal(colorLabel(), 'Color: Natural');
clickAddToBag();
assert.equal(added.length, 1);
assert.equal(added[0].product.id, 'prod-bag-1');
assert.equal(added[0].size, 'One Size');
assert.equal(added[0].color, 'Natural');
// Let the modal's 900ms "Added!" timer fire inside act().
await act(async () => {
  await new Promise((r) => setTimeout(r, 1000));
});

// 3. Closing and reopening the first product starts from its defaults.
renderModal(null, false);
renderModal(dress, true);
assert.equal(sizeLabel(), 'Size: XS');
assert.equal(colorLabel(), 'Color: Red');

console.log('ProductModal.test.tsx: all assertions passed');
