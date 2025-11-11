import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  console.log({ product });
  return (
    <div className="product-card">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="rounded-md"
      />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <Link href={`/products/${product.slug}`}>View Details</Link>
    </div>
  );
}
