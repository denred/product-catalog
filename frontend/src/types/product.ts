export interface Product {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  availability: boolean;
  slug?: string;
}
