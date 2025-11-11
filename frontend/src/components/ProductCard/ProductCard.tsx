'use client';

import { Product } from '@/types/product';

import Image from 'next/image';
import './styles.scss';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
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
  );
};

export default ProductCard;
