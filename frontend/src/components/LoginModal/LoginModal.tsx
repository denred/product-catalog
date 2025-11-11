'use client';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema } from '@/validations';
import './styles.scss';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (
    values: { email: string; password: string },
    {
      setSubmitting,
      setStatus,
    }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setStatus('');
    const success = await login(values.email, values.password);

    if (success) {
      onClose();
    } else {
      setStatus('Invalid email or password');
    }

    setSubmitting(false);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-content login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 className="modal-title">Login</h2>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {/* remove this block */}
        <div className="demo-accounts">
          <h3>Demo Accounts:</h3>
          <p>
            <strong>Admin:</strong> admin@gmail.com / admin123
          </p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="login-form">
              {status && <div className="error-message">{status}</div>}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="form-input"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="form-input"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onClose}
                  disabled={isSubmitting || isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading || isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginModal;
