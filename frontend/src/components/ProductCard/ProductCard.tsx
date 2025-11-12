import { Product } from '@/types/product';

import Image from 'next/image';
import Link from 'next/link';
import './styles.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`} className="product-card-link">
      <div className="product-card">
        <div className="image-wrapper">
          <Image
            src={product.image}
            alt={product.title}
            width={240}
            height={240}
            className="product-image"
          />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
