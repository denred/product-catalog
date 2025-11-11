'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { UserRole } from '@/enums';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser) as User;
        setAuthState({
          user,
          token: savedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const user = data.user as User;
      const token = data.token as string;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      setAuthState({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const isAdmin = (): boolean => authState.user?.role === UserRole.ADMIN;

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
