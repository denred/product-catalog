'use client';
import { useGetProductBySlugQuery } from '@/store/products-api';
import Image from 'next/image';

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const { data: product, isLoading } = useGetProductBySlugQuery(params.slug);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <Image src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
