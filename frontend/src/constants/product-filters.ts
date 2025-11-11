export const PRODUCT_CATEGORIES = [
  'Clothing',
  'Shoes',
  'Accessories',
  'Electronics',
] as const;

import { SortType } from '@/enums';

export const SORT_OPTIONS = [
  { value: SortType.DEFAULT, label: 'Default' },
  { value: SortType.PRICE_ASC, label: 'Price: Low to High' },
  { value: SortType.PRICE_DESC, label: 'Price: High to Low' },
  { value: SortType.TITLE, label: 'Name: A to Z' },
];

export const PricePerRange = {
  MIN: 0,
  MAX: 2000,
  STEP: 50,
  DEFAULT: [0, 1000] as const,
} as const;
