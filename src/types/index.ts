export type ProductCategory = 'all' | 'jeans' | 'henleys' | 'boots';

export interface ProductColor {
  name: string;
  hex: string;
  available?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'jeans' | 'henleys' | 'boots';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  slogan?: string;
  description: string;
  features: string[];
  composition: string;
  fit?: string;
  colors: ProductColor[];
  defaultColor: string;
  sizes: string[];
  defaultSize: string;
  modelInfo?: string;
  badge?: string;
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
  detailsNote?: string;
}

export interface SizeMeasurement {
  size: string;
  waistWidthCm: number;
  lengthCm: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  comment: string;
  rating: number;
  image?: string;
  imageSmall?: string;
  imageWidth?: number;
  imageSmallWidth?: number;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  subtitle: string;
  collection: string;
  city: string;
  country: string;
  whatsappNumber: string;
  whatsappWaMe: string;
  instagramHandle: string;
  instagramUrl: string;
  foundationYear?: string;
}
