export interface Product {
  id: string;
  name: string;
  category: 'dresses' | 'tops' | 'outerwear' | 'handbags' | string;
  price: number;
  originalPrice?: number;
  memberPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  badge?: string;
  fabric?: string;
  fit?: string;
  image: string;
  description: string;
  colors: {
    name: string;
    hex: string;
  }[];
  sizes: string[];
}

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  linkText: string;
  categoryKey: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type AppPage =
  | 'home'
  | 'new-arrivals'
  | 'bestsellers'
  | 'dresses'
  | 'tops'
  | 'outerwear'
  | 'handbags'
  | 'size-guide'
  | 'search';

export interface ImageConfig {
  hero: string;
  editorialBanner: string;
  catDresses: string;
  catTops: string;
  catBottoms: string;
  catEssentials: string;
  prodFloralMaxi: string;
  prodPuffBlouse: string;
  prodLinenPants: string;
  prodRibbedDress: string;
}
