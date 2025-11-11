import { Product } from '@/types/product';

export type FormMode = 'create' | 'edit' | 'delete';

export interface FormConfig {
  title: string;
  submitButtonText: string;
  submitButtonClass: string;
  showForm: boolean;
  confirmDelete?: boolean;
}

export const FormConfigs: Record<FormMode, FormConfig> = {
  create: {
    title: 'Add New Product',
    submitButtonText: 'Add Product',
    submitButtonClass: 'btn-primary',
    showForm: true,
    confirmDelete: false,
  },
  edit: {
    title: 'Edit Product',
    submitButtonText: 'Update Product',
    submitButtonClass: 'btn-primary',
    showForm: true,
    confirmDelete: false,
  },
  delete: {
    title: 'Delete Product',
    submitButtonText: 'Delete Product',
    submitButtonClass: 'btn-danger',
    showForm: false,
    confirmDelete: true,
  },
};

export interface ProductFormModalProps {
  isOpen: boolean;
  mode: FormMode;
  product?: Product;
  onClose: () => void;
  onSubmit: (product: Omit<Product, '_id'>, id?: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}
