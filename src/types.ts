export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
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
