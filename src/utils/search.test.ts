import assert from 'node:assert';
import { matchesSearch } from './search';
import type { Product } from '../types';

// Small fixtures (same shape as the catalog products in src/data/mockData).
const dress: Product = {
  id: 't1',
  name: 'Floral Off-Shoulder Summer Mini Dress',
  category: 'dresses',
  price: 34.99,
  rating: 4.8,
  reviewsCount: 10,
  image: '',
  description: 'A breezy summer dress in a floral print',
  colors: [],
  sizes: [],
};
const tee: Product = {
  id: 't2',
  name: 'California Sunset Oversized Streetwear Graphic Tee',
  category: 'tops',
  price: 16.99,
  rating: 4.8,
  reviewsCount: 10,
  image: '',
  description: 'Relaxed everyday tee',
  fabric: '100% Bio-Washed Combed Cotton',
  colors: [],
  sizes: [],
};

// Multi-word queries match when every word appears somewhere in the product
// text — word order and adjacency do not matter.
assert.equal(matchesSearch(dress, 'Floral Summer Dress'), true);
assert.equal(matchesSearch(dress, 'summer floral'), true);
assert.equal(matchesSearch(dress, 'floral dress'), true);
assert.equal(matchesSearch(tee, 'Streetwear Graphic Tee'), true);
assert.equal(matchesSearch(tee, 'cotton tee'), true);

// A word that appears nowhere must not match.
assert.equal(matchesSearch(dress, 'Floral Leather Dress'), false);
assert.equal(matchesSearch(dress, 'All Bestsellers'), false);

// Single words and empty queries behave as before.
assert.equal(matchesSearch(dress, 'dress'), true);
assert.equal(matchesSearch(dress, 'DRESS'), true);
assert.equal(matchesSearch(dress, ''), true);
assert.equal(matchesSearch(dress, '   '), true);
assert.equal(matchesSearch(dress, '  FLORAL   dress  '), true);

console.log('search.test.ts: all assertions passed');
