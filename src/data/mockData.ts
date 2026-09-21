import { CategoryItem, Product } from '../types';

import heroImg from '../assets/images/trendy_hero_orange_1789968007455.jpg';
import bannerImg from '../assets/images/trendy_banner_moments_1789968122328.jpg';
import catDressesImg from '../assets/images/trendy_cat_red_dress_1789968023428.jpg';
import catTopsImg from '../assets/images/trendy_cat_pink_top_1789968033202.jpg';
import catOuterwearImg from '../assets/images/trendy_cat_coat_1789968046281.jpg';
import catHandbagsImg from '../assets/images/trendy_cat_handbag_1789968059137.jpg';

import prodFloralImg from '../assets/images/trendy_prod_yellow_floral_1789968072629.jpg';
import prodWhiteTopImg from '../assets/images/trendy_prod_white_top_1789968085924.jpg';
import prodBohoDressImg from '../assets/images/trendy_prod_boho_orange_1789968095761.jpg';
import prodPinkTeeImg from '../assets/images/trendy_prod_pink_tee_1789968108327.jpg';

export const initialImages = {
  hero: heroImg,
  editorialBanner: bannerImg,
  catDresses: catDressesImg,
  catTops: catTopsImg,
  catBottoms: catOuterwearImg,
  catEssentials: catHandbagsImg,
  prodFloralMaxi: prodFloralImg,
  prodPuffBlouse: prodWhiteTopImg,
  prodLinenPants: prodBohoDressImg,
  prodRibbedDress: prodPinkTeeImg,
};

export const defaultCategories: CategoryItem[] = [
  {
    id: 'cat-1',
    title: 'Dresses',
    image: catDressesImg,
    linkText: 'Shop Now',
    categoryKey: 'dresses',
  },
  {
    id: 'cat-2',
    title: 'Tops',
    image: catTopsImg,
    linkText: 'Shop Now',
    categoryKey: 'tops',
  },
  {
    id: 'cat-3',
    title: 'Outerwear',
    image: catOuterwearImg,
    linkText: 'Shop Now',
    categoryKey: 'outerwear',
  },
  {
    id: 'cat-4',
    title: 'Handbags',
    image: catHandbagsImg,
    linkText: 'Shop Now',
    categoryKey: 'handbags',
  },
];

export const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Floral Off Shoulder Dress',
    category: 'dresses',
    price: 34.99,
    originalPrice: 48.0,
    rating: 5.0,
    reviewsCount: 1420,
    isBestSeller: true,
    image: prodFloralImg,
    description:
      'Charming off-the-shoulder summer mini dress featuring sweet ruffled cap sleeves and vivid botanical floral print on breathable stretch cotton.',
    colors: [
      { name: 'Sunny Mustard', hex: '#E5A93C' },
      { name: 'Warm Cream', hex: '#F0E7D8' },
      { name: 'Midnight Black', hex: '#1C1917' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 'prod-2',
    name: 'White Summer Tank Top',
    category: 'tops',
    price: 19.99,
    originalPrice: 24.99,
    rating: 5.0,
    reviewsCount: 980,
    isBestSeller: false,
    image: prodWhiteTopImg,
    description:
      'Sleek and versatile high-neck sleeveless summer tank crafted from ribbed pima cotton with subtle contour stretch.',
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Heather Grey', hex: '#A3A3A3' },
      { name: 'Onyx Black', hex: '#1C1917' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-3',
    name: 'Boho Beach Dress',
    category: 'dresses',
    price: 29.89,
    rating: 5.0,
    reviewsCount: 812,
    isBestSeller: false,
    image: prodBohoDressImg,
    description:
      'Radiant sunny orange spaghetti-strap boho sundress featuring delicate smocked bodice and breezy A-line tiered skirt.',
    colors: [
      { name: 'Marigold Orange', hex: '#E87A24' },
      { name: 'Sage Green', hex: '#637A65' },
      { name: 'Terracotta', hex: '#B85D3B' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-4',
    name: 'Pink Graphic Casual Tee',
    category: 'tops',
    price: 16.99,
    rating: 5.0,
    reviewsCount: 1250,
    isBestSeller: false,
    image: prodPinkTeeImg,
    description:
      'Soft-washed everyday crewneck t-shirt in vintage dusty rose featuring a relaxed boyfriend drape and premium combed cotton.',
    colors: [
      { name: 'Dusty Rose', hex: '#D89FA5' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Charcoal', hex: '#2C2B2A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
  },
];
