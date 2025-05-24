export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  price?: number;
  imageUrl?: string;
  features?: string[];
  degisenNo?: string;
  createdAt: Date;
  updatedAt: Date;
}
