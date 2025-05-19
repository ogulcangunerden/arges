export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  brand: string;
  imageUrl: string;
  description: string;
  features: string[];
  specifications: {
    name: string;
    value: string;
  }[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Brand = {
  id: string;
  name: string;
  image: string;
};
