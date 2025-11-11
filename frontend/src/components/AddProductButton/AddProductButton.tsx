'use client';
import { useState } from 'react';
import ProductFormModal from '../ProductFormModal/ProductFormModal';

import './styles.scss';
import { Product } from '@/types/product';

interface AddProductButtonProps {
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  className?: string;
}

const AddProductButton = ({
  onAddProduct,
  className = '',
}: AddProductButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProduct = async (product: Omit<Product, 'id'>) => {
    await onAddProduct(product);
    setIsModalOpen(false);
  };

  return (
    <div className={className}>
      <button
        className="add-product-button"
        type="button"
        onClick={handleOpenModal}
      >
        <span className="plus-icon">+</span>
        Add Product
      </button>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
      />
    </div>
  );
};

export default AddProductButton;
