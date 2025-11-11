import { Product } from '@/types/product';

export const getInitialProduct = (): Omit<Product, 'id'> => {
  return {
    title: '',
    image: '',
    category: '',
    price: 0,
    availability: true,
    slug: '',
    description: '',
  };
};
