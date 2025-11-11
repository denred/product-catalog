'use client';
import { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createValidationSchema } from '@/validations/product';
import { PRODUCT_CATEGORIES } from '@/constants';
import { generateSlug } from '@/utils/generate-slug';
import { getInitialProduct } from '@/utils/get-initial-product';
import { FormConfigs, ProductFormModalProps } from '@/constants/form-configs';
import { Product } from '../../types/product';
import './styles.scss';

const ProductFormModal = ({
  isOpen,
  mode,
  product,
  onClose,
  onSubmit,
  onDelete,
}: ProductFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const config = FormConfigs[mode];
  const initialValues = product
    ? { ...product, slug: product.slug }
    : getInitialProduct();

  const handleSubmit = async (values: Omit<Product, '_id'>) => {
    setIsSubmitting(true);
    try {
      const productData = { ...values, slug: generateSlug(values.title) };
      await onSubmit(productData, product?._id);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!product?._id || !onDelete) return;

    setIsSubmitting(true);
    try {
      await onDelete(product._id);
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) modalRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Add new product"
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2>{config.title}</h2>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {config.confirmDelete ? (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this product?</p>
            <div className="product-preview">
              <h3>{product?.title}</h3>
              <p>{product?.category}</p>
              <p>${product?.price?.toFixed(2)}</p>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={createValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form className="product-form">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <Field
                    id="title"
                    name="title"
                    className="form-input"
                    placeholder="Product title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('title', e.target.value);
                      setFieldValue('slug', generateSlug(e.target.value));
                    }}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL *</label>
                  <Field
                    id="image"
                    name="image"
                    type="url"
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="form-select"
                  >
                    <option value="">Select a category</option>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group inline">
                  <div className="form-group price">
                    <label htmlFor="price">Price *</label>
                    <Field
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-input"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="error"
                    />
                  </div>

                  <label htmlFor="availability" className="checkbox-label">
                    <Field
                      id="availability"
                      name="availability"
                      type="checkbox"
                      className="form-checkbox"
                    />
                    Available
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="form-textarea"
                    rows={4}
                    placeholder="Enter product description..."
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="slug">Slug (Auto-generated)</label>
                  <Field
                    id="slug"
                    name="slug"
                    className="form-input readonly"
                    readOnly
                    value={generateSlug(values.title)}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={config.submitButtonClass}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : config.submitButtonText}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ProductFormModal;
