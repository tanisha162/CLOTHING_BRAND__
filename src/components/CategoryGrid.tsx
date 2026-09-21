import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryItem } from '../types';

interface CategoryGridProps {
  categories: CategoryItem[];
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#C5BAAF]" />
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal tracking-tight">
              Shop by Category
            </h2>
            <span className="w-8 h-[1px] bg-[#C5BAAF]" />
          </div>
          <p className="text-sm sm:text-base text-[#73685C]">
            Find your next favorite look
          </p>
        </div>

        {/* 4-Column Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => onSelectCategory(category.categoryKey)}
            >
              {/* Card Image Container */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#EFEAE2] border border-[#E9E2D8]">
                <img
                  src={category.image}
                  alt={category.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Title and Shop Now link */}
              <div className="text-center mt-5">
                <h3 className="font-serif text-2xl text-[#1C1917] font-medium tracking-tight mb-1 group-hover:text-[#8A5137] transition-colors">
                  {category.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#73685C] group-hover:text-[#1C1917] transition-colors">
                  <span>{category.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
