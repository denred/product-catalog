'use client';
import { useState } from 'react';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '@/store/products-api';
import ProductSidebar from '@/components/ProductSidebar';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import AddProductButton from '@/components/AddProductButton/AddProductButton';
import { filterAndSortProducts } from '@/utils/product-filters';

import { SortType } from '@/enums';
import './products.scss';
import { Product } from '../types/product';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState(SortType.DEFAULT);

  const { data: products = [], isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();

  const handleAddProduct = async (productData: Omit<Product, '_id'>) => {
    await createProduct(productData);
  };

  if (isLoading) return <p>Loading...</p>;

  const filteredProducts = filterAndSortProducts(
    products,
    { searchTerm, selectedCategories, priceRange },
    { sortBy }
  );

  return (
    <div className="products-page">
      <ProductSidebar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="products-content">
        <AddProductButton
          className="products-header"
          onAddProduct={handleAddProduct}
        />

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          emptyMessage="No products found"
        />
      </div>
    </div>
  );
};

export default ProductsPage;
