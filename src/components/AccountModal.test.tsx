// Regression test for the Rewards-tab coupon terms: it advertised
// MUSE15 as "$15 Off ($100+ order)", but checkout applies a flat 15%
// percent discount with no minimum — a $60 bag got $9 off, not $15,
// and a sub-$100 bag got the discount at all. The advertised terms
// must match what getPromoDiscount actually grants.
// Run with: npx tsx src/components/AccountModal.test.tsx
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
const { AccountModal } = await import('./AccountModal');
const { getPromoDiscount } = await import('../utils/promo');

const container = document.getElementById('root')!;
const root = createRoot(container);
const noop = () => {};

act(() => {
  root.render(
    React.createElement(AccountModal, {
      isOpen: true,
      onClose: noop,
      onExploreProducts: noop,
    })
  );
});

const clickTab = (label: string) =>
  act(() => {
    const btn = [...container.querySelectorAll('button')].find((b) =>
      b.textContent?.includes(label)
    );
    assert.ok(btn, `tab "${label}" should exist`);
    btn!.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  });

// MUSE15 grants 15% off with no minimum — the util has no minimum-order
// concept at all, so a $60 subtotal is discounted $9, not $15.
assert.equal(getPromoDiscount('MUSE15'), 15);
assert.equal((60 * getPromoDiscount('MUSE15')) / 100, 9);

// The Rewards tab must advertise those exact terms: 15% off, no dollar
// figure and no $100 minimum.
clickTab('Luméa Club Rewards');
const rewardsText = container.textContent ?? '';
assert.ok(rewardsText.includes('MUSE15'), 'MUSE15 code should be shown');
assert.ok(
  rewardsText.includes('15% Off'),
  'coupon should be advertised as 15% off'
);
assert.ok(
  !rewardsText.includes('$15 Off'),
  'coupon must not be advertised as a flat $15 off'
);
assert.ok(
  !rewardsText.includes('$100'),
  'coupon must not claim a $100 minimum order'
);

console.log('AccountModal.test.tsx: all assertions passed');
