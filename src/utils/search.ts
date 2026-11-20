import { Product } from '../types';

// A product matches a search when every word in the query appears somewhere
// in its searchable text (name, category, description, fabric, badge).
// Matching the whole query as one literal phrase meant natural multi-word
// searches such as "Floral Summer Dress" found nothing, even though
// "Floral Off-Shoulder Summer Mini Dress" is in the catalog.
export function matchesSearch(product: Product, query: string): boolean {
  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [product.name, product.category, product.description, product.fabric, product.badge]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}
