import React from 'react';
import { Sparkles, Heart, Truck, PackageCheck } from 'lucide-react';

export const WhyLoveUs: React.FC = () => {
  const valueProps = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Made to last, season after season.',
    },
    {
      icon: Heart,
      title: 'Effortless Style',
      description: 'Trendy yet timeless pieces.',
    },
    {
      icon: Truck,
      title: 'Fast & Free Shipping',
      description: 'On orders over $75.',
    },
    {
      icon: PackageCheck,
      title: 'Easy Returns',
      description: 'Shop with confidence.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F3ECE4] border-y border-[#E6DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal tracking-tight">
            Why Women Love Luméa
          </h2>
        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center px-3 group"
              >
                {/* Thin circular outlined icon */}
                <div className="w-14 h-14 rounded-full border border-[#7D7063] flex items-center justify-center mb-5 bg-[#FAF8F5]/60 group-hover:bg-[#FAF8F5] group-hover:border-[#1C1917] group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#2D2620] stroke-[1.4]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-[#1C1917] font-semibold mb-1 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6A5F54] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
