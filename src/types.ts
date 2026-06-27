export interface Product {
  id: string;
  nameEn: string;
  nameHi: string;
  categoryEn: string;
  categoryHi: string;
  basePrice: number; // in INR
  unitEn: string; // e.g., "per quintal", "per 50kg bag", "per piece"
  unitHi: string; // e.g., "प्रति क्विंटल", "प्रति 50kg बोरी", "प्रति पीस"
  image: string;
  descriptionEn: string;
  descriptionHi: string;
  nutritionEn?: string;
  nutritionHi?: string;
  inStock: boolean;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface District {
  id: string;
  nameEn: string;
  nameHi: string;
  priceMultiplier: number; // local transport/supply overhead
  deliveryChargePerKm: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface TickerUpdate {
  id: string;
  messageEn: string;
  messageHi: string;
  type: 'up' | 'down' | 'info';
  timestamp: string; // relative reference
}

export interface FeedMixIngredient {
  nameEn: string;
  nameHi: string;
  ratio: number; // percentage
  purposeEn: string;
  purposeHi: string;
}
