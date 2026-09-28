import React from 'react';
import { AppPage } from '../types';
import {
  Sparkles,
  Flame,
  Shirt,
  Ruler,
  ShoppingBag,
  Layers,
} from 'lucide-react';

interface CategoryStripProps {
  activePage: AppPage;
  onSelectPage: (page: AppPage) => void;
}

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  activePage,
  onSelectPage,
}) => {
  const items: {
    page: AppPage;
    label: string;
    icon: string;
    badge?: string;
    isHot?: boolean;
    isNew?: boolean;
  }[] = [
    { page: 'home', label: 'All Collection', icon: '✨' },
    { page: 'new-arrivals', label: 'New Arrivals', icon: '⚡', badge: 'NEW', isNew: true },
    { page: 'bestsellers', label: 'All Bestsellers', icon: '🔥', badge: 'HOT', isHot: true },
    { page: 'dresses', label: 'Dresses', icon: '👗' },
    { page: 'tops', label: 'Tops & Tees', icon: '👚' },
    { page: 'outerwear', label: 'Outerwear', icon: '🧥' },
    { page: 'handbags', label: 'Handbags', icon: '👜' },
    { page: 'size-guide', label: 'Size Guide', icon: '📏', badge: 'FIT' },
  ];

  return (
    <div className="bg-[#F6F2EC] border-b border-[#E8DFD4] py-2.5 px-4 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-2 sm:gap-3 min-w-max">
        {items.map((item) => {
          const isActive = activePage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onSelectPage(item.page)}
              className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#1C1917] text-white shadow-sm ring-1 ring-[#1C1917]'
                  : 'bg-white text-[#4A4036] hover:bg-[#EFE8DE] border border-[#E2D8CC]'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                    isActive
                      ? 'bg-[#E5A93C] text-[#1C1917]'
                      : item.isHot
                      ? 'bg-rose-100 text-rose-700'
                      : item.isNew
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
