import React, { useState } from 'react';
import { X, Search, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E7DFD4] z-10">
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8E1D7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8074]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, tops, linen pants, cardigans..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#9E9285] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8A7E73] hover:text-[#1C1917]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#6E645A] hover:text-[#1C1917]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-[#F4EFE7] border-b border-[#E8E0D5] flex items-center gap-2 overflow-x-auto text-xs text-[#5D5246]">
          <span className="text-[11px] font-semibold text-[#8C8074] uppercase flex-shrink-0">
            Popular:
          </span>
          {['Floral Dress', 'Summer Tank', 'Boho Dress', 'Graphic Tee', 'Dresses', 'Tops'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-white text-[#3C342C] border border-[#DDD3C6] hover:border-[#1C1917] flex-shrink-0 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-4 divide-y divide-[#EBE3D7]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8A7E73]">
              No items found matching "{query}". Try searching for dresses or tops.
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-white rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-md bg-stone-100 flex-shrink-0 border border-[#E3DBD0]"
                  />
                  <div>
                    <h4 className="font-serif text-base text-[#1C1917] font-medium group-hover:text-[#B85D3B] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex text-[#DF9B35]">
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-[11px] text-[#7A7065]">
                        {product.rating.toFixed(1)} ({product.reviewsCount})
                      </span>
                      <span className="text-[11px] font-semibold text-[#1C1917] ml-2">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#8A7E73] group-hover:text-[#1C1917]">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
