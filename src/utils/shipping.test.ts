import assert from 'node:assert/strict';
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  getShippingCost,
  isFreeShipping,
} from './shipping';

// The threshold the bag actually grants must stay $75: Header,
// ProductModal and WhyLoveUs all promise "Free shipping $75+", and the
// OfferBanner once promised $50 while the bag charged $8 under $75.
assert.equal(FREE_SHIPPING_THRESHOLD, 75);
assert.equal(STANDARD_SHIPPING_COST, 8);

// Empty bag: no shipping charge.
assert.equal(getShippingCost(0), 0);
assert.equal(isFreeShipping(0), false);

// Below the threshold the flat $8 applies — including the $50-$75 band
// the old banner wrongly called free shipping.
assert.equal(getShippingCost(50), 8);
assert.equal(getShippingCost(60), 8);
assert.equal(getShippingCost(74.99), 8);
assert.equal(isFreeShipping(60), false);

// At and above the threshold shipping is free.
assert.equal(getShippingCost(75), 0);
assert.equal(getShippingCost(100), 0);
assert.equal(isFreeShipping(75), true);

console.log('shipping.test.ts: all assertions passed');
