import { Product } from '@/types/product';
import { SortType } from '@/enums';

export interface FilterOptions {
  searchTerm: string;
  selectedCategories: string[];
  priceRange: [number, number];
}

export interface SortOptions {
  sortBy: SortType | string;
}

/**
 * Filters products based on search term, categories, and price range
 */
export const filterProducts = (
  products: Product[],
  options: FilterOptions
): Product[] => {
  const { searchTerm, selectedCategories, priceRange } = options;

  return products.filter((product) => {
    const matchesSearch =
      searchTerm === '' ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

/**
 * Sorts products based on sort criteria
 */
export const sortProducts = (
  products: Product[],
  options: SortOptions
): Product[] => {
  const { sortBy } = options;

  return [...products].sort((a, b) => {
    switch (sortBy) {
      case SortType.PRICE_ASC:
        return a.price - b.price;
      case SortType.PRICE_DESC:
        return b.price - a.price;
      case SortType.TITLE:
        return a.title.localeCompare(b.title);
      case SortType.DEFAULT:
      default:
        return 0;
    }
  });
};

/**
 * Combines filtering and sorting in one function
 */
export const filterAndSortProducts = (
  products: Product[],
  filterOptions: FilterOptions,
  sortOptions: SortOptions
): Product[] => {
  const filtered = filterProducts(products, filterOptions);

  return sortProducts(filtered, sortOptions);
};
