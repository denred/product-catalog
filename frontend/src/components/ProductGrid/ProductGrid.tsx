import { Product } from '@/types/product';
import ProductCard from '../ProductCard/ProductCard';
import './styles.scss';

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const ProductGrid = ({
  products = [],
  isLoading = false,
  emptyMessage = 'Products not found',
  className = 'product-grid',
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className={`${className} loading`}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid">
        {products.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
