'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import './styles.scss';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-title-link">
          <h1 className="navbar-title">Product Catalog</h1>
        </Link>

        <div className="navbar-menu">
          <Link href="/" className="navbar-link">
            Products
          </Link>

          {isAuthenticated && isAdmin() && (
            <Link href="/users" className="navbar-link">
              Users Management
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">
                {user?.name}
                {isAdmin() && <span className="admin-badge">Admin</span>}
              </span>
              <button onClick={logout} className="btn-secondary logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLoginModalOpen(true);
              }}
              className="btn-primary login-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
