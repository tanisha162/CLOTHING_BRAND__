import React, { useState } from 'react';
import { X, Search, Star, ArrowRight, Zap, Ruler, Flame, Sparkles } from 'lucide-react';
import { Product, AppPage } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllResults?: (query: string) => void;
  onOpenSizeGuide?: () => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onViewAllResults,
  onOpenSizeGuide,
  onNavigatePage,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.fabric?.toLowerCase().includes(query.toLowerCase()) ||
      p.badge?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onViewAllResults) {
      onViewAllResults(query.trim());
      onClose();
    }
  };

  const trendingItems = products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-10 sm:pt-16 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E7DFD4] z-10 animate-fade-in my-auto">
        {/* Search Input Header */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 bg-white border-b border-[#E8E1D7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8074] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, tops, outerwear, handbags, bestsellers..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#1C1917] placeholder-[#9E9285] focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#8A7E73] hover:text-[#1C1917] font-bold"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E645A] hover:text-[#1C1917] hover:bg-[#F2ECE5]"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* View All on Collection Page CTA (when query entered) */}
        {query.trim() && (
          <div className="px-5 py-2.5 bg-[#FAF4ED] border-b border-[#EAE0D5] flex items-center justify-between text-xs">
            <span className="text-[#6D5D4E] font-medium">
              Found <strong>{filtered.length}</strong> matching styles for &quot;{query}&quot;
            </span>
            {onViewAllResults && (
              <button
                type="button"
                onClick={() => {
                  onViewAllResults(query.trim());
                  onClose();
                }}
                className="font-bold text-[#B85D3B] hover:text-[#934529] flex items-center gap-1"
              >
                <span>View Full Page & Filter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-h-[68vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {query.trim() ? (
            /* Results list */
            <div>
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8A7E73]">
                  No items found matching &quot;{query}&quot;. Try searching for dresses, tops, outerwear or bags.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="p-3 bg-white rounded-2xl border border-[#EDE5DA] hover:border-[#1C1917] hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-xl bg-stone-100 flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        {product.badge && (
                          <span className="text-[9px] font-black text-[#B85D3B] uppercase tracking-wider block">
                            {product.badge}
                          </span>
                        )}
                        <h4 className="font-bold text-xs sm:text-sm text-[#1C1917] group-hover:text-[#B85D3B] transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-[#1C1917]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#9E9082] line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {product.memberPrice && (
                          <div className="mt-1 text-[10px] text-[#8C5E28] bg-[#FBF3E8] px-2 py-0.5 rounded-md font-bold inline-block">
                            ⚡ ${product.memberPrice.toFixed(2)} TriBe
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty State: 1-Click Categories + Trending Searches + Various Clothes Showcase */
            <div className="space-y-6">
              
              {/* 1. Quick Category Circles */}
              <div>
                <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2.5">
                  Browse by Category
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { key: 'dresses', label: 'Dresses', icon: '👗' },
                    { key: 'tops', label: 'Tops & Tees', icon: '👚' },
                    { key: 'outerwear', label: 'Outerwear', icon: '🧥' },
                    { key: 'handbags', label: 'Handbags', icon: '👜' },
                    { key: 'bestsellers', label: 'Bestsellers', icon: '🔥' },
                    { key: 'new-arrivals', label: 'New Drops', icon: '✨' },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        if (onNavigatePage) onNavigatePage(cat.key as AppPage);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-white hover:bg-[#1C1917] hover:text-white transition-all text-center border border-[#EDE5DA] shadow-2xs"
                    >
                      <span className="text-2xl block mb-1">{cat.icon}</span>
                      <span className="text-xs font-bold block truncate">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Popular Search Terms */}
              <div>
                <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Floral Summer Dress',
                    'Streetwear Graphic Tee',
                    'Camel Trench Coat',
                    'Woven Straw Tote',
                    'Linen Peasant Blouse',
                    'Ribbed Knit Midi',
                    'Denim Trucker Jacket',
                    'All Bestsellers',
                  ].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        if (onViewAllResults) {
                          onViewAllResults(term);
                          onClose();
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#1C1917] hover:text-white text-[#4A4036] text-xs font-bold transition-all border border-[#DFD5C6] shadow-2xs"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Featured Trending Clothes Showcase */}
              <div>
                <div className="text-[11px] font-black text-[#8C7D6F] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>🔥 Featured Trending Clothes</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                    HOT DEALS
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {trendingItems.map((cloth) => (
                    <div
                      key={cloth.id}
                      onClick={() => {
                        onSelectProduct(cloth);
                        onClose();
                      }}
                      className="bg-white rounded-2xl p-2.5 border border-[#EDE5DA] hover:border-[#1C1917] hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-stone-100 relative">
                        <img
                          src={cloth.image}
                          alt={cloth.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {cloth.badge && (
                          <span className="absolute top-1.5 left-1.5 bg-[#1C1917] text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                            {cloth.badge}
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-[#1C1917] truncate group-hover:text-[#B85D3B]">
                        {cloth.name}
                      </h5>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-black text-[#1C1917]">
                          ${cloth.price.toFixed(2)}
                        </span>
                        {cloth.memberPrice && (
                          <span className="text-[10px] text-[#8C5E28] font-bold">
                            ⚡ ${cloth.memberPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer with size guide shortcut */}
        {onOpenSizeGuide && (
          <div className="p-3.5 bg-[#F2EDE5] border-t border-[#E3D9CC] flex items-center justify-between text-xs text-[#6B5F53]">
            <span>Need measurement advice?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSizeGuide();
              }}
              className="font-bold text-[#1C1917] hover:underline flex items-center gap-1"
            >
              <Ruler className="w-3.5 h-3.5 text-[#B85D3B]" />
              <span>Interactive Size & Fit Calculator</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
