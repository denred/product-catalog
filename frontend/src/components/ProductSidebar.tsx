'use client';

import PriceRangeFilter from './PriceRangeFilter/PriceRangeFilter';
import SearchInput from './SearchInput/SearchInput';
import ProductCategoryFilter from './ProductCategoryFilter/ProductCategoryFilter';
import SortFilter from './SortFilter/SortFilter';
import { useGetProductCategoriesQuery } from '@/store/products-api';
import { SORT_OPTIONS, PricePerRange } from '../constants';
import { SortType } from '@/enums';

interface ProductSidebarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedCategories?: string[];
  onCategoryChange?: (categories: string[]) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (price: [number, number]) => void;
  sortBy?: SortType | string;
  onSortChange?: (sort: SortType) => void;
}

export const ProductSidebar = ({
  searchTerm = '',
  onSearchChange,
  selectedCategories = [],
  onCategoryChange,
  priceRange = [0, 1000],
  onPriceRangeChange,
  sortBy = SortType.DEFAULT,
  onSortChange,
}: ProductSidebarProps) => {
  const { data: categories = [] } = useGetProductCategoriesQuery();

  return (
    <aside className="sidebar">
      <SearchInput value={searchTerm} onChange={onSearchChange} />

      <ProductCategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />

      <PriceRangeFilter
        value={priceRange}
        onChange={onPriceRangeChange}
        min={PricePerRange.MIN}
        max={PricePerRange.MAX}
        step={PricePerRange.STEP}
      />

      <SortFilter
        sortBy={sortBy}
        onSortChange={onSortChange}
        options={SORT_OPTIONS}
      />
    </aside>
  );
};

export default ProductSidebar;
