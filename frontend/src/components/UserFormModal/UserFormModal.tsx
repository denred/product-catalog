'use client';
import { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { UserRole } from '@/enums';
import { User, CreateUserDto } from '@/types/user';

import './styles.scss';

export type UserFormMode = 'create' | 'edit' | 'delete';

interface UserFormConfig {
  title: string;
  submitButtonText: string;
  submitButtonClass: string;
  showForm: boolean;
  confirmDelete?: boolean;
}

const UserFormConfigs: Record<UserFormMode, UserFormConfig> = {
  create: {
    title: 'Add New User',
    submitButtonText: 'Add User',
    submitButtonClass: 'btn-primary',
    showForm: true,
    confirmDelete: false,
  },
  edit: {
    title: 'Edit User',
    submitButtonText: 'Update User',
    submitButtonClass: 'btn-primary',
    showForm: true,
    confirmDelete: false,
  },
  delete: {
    title: 'Delete User',
    submitButtonText: 'Delete User',
    submitButtonClass: 'btn-danger',
    showForm: false,
    confirmDelete: true,
  },
};

interface UserFormModalProps {
  isOpen: boolean;
  mode: UserFormMode;
  user?: User;
  onClose: () => void;
  onSubmit: (user: CreateUserDto, id?: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

const UserValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(Object.values(UserRole))
    .required('Role is required'),
});

const UserFormModal = ({
  isOpen,
  mode,
  user,
  onClose,
  onSubmit,
  onDelete,
}: UserFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const config = UserFormConfigs[mode];
  const initialValues: CreateUserDto = user
    ? {
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      }
    : {
        name: '',
        email: '',
        password: '',
        role: UserRole.USER,
      };

  const handleSubmit = async (values: CreateUserDto) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values, user?._id || user?.id);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const userId = user?._id || user?.id;
    if (!userId || !onDelete) return;

    setIsSubmitting(true);
    try {
      await onDelete(userId);
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
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
      aria-label="User form modal"
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
            <p>Are you sure you want to delete this user?</p>
            <div className="user-preview">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <p className={`role-badge ${user?.role}`}>{user?.role}</p>
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
                {isSubmitting ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={UserValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="user-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <Field
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter user name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="user@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password *{' '}
                    {mode === 'edit' &&
                      '(Leave empty to keep current password)'}
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className="form-select"
                  >
                    <option value="">Select a role</option>
                    {Object.values(UserRole).map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="role" component="div" className="error" />
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

export default UserFormModal;
