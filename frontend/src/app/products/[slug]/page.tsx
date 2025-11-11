'use client';
import { use } from 'react';
import {
  useGetProductBySlugQuery,
  useGetProductsQuery,
} from '@/store/products-api';
import Image from 'next/image';
import Link from 'next/link';
import './styles.scss';

interface ProductDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const { data: product, isLoading } = useGetProductBySlugQuery(slug || '', {
    skip: !slug,
  });

  const { data: allProducts = [] } = useGetProductsQuery();

  if (!slug) return <p>Invalid product URL.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="product-detail">
      <nav className="breadcrumb">
        <Link href="/">Home</Link> / <span>{product.category}</span>
      </nav>

      <div className="detail-card">
        <div className="image-section">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="product-image"
            priority
          />
        </div>

        <div className="info-section">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-meta">
            <span className="product-price">${product.price.toFixed(2)}</span>
            <span
              className={`availability ${
                product.availability ? 'in-stock' : 'out-of-stock'
              }`}
            >
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="actions">
            <button className="btn-primary">Update</button>
            <button className="btn-secondary">Delete</button>
          </div>
        </div>
      </div>

      {!!relatedProducts.length && (
        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/products/${rp.slug}`}
                className="related-card"
              >
                <Image
                  src={rp.image}
                  alt={rp.title}
                  width={160}
                  height={160}
                  className="related-image"
                />
                <p className="related-title">{rp.title}</p>
                <p className="related-price">${rp.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
