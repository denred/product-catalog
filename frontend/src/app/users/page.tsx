'use client';
import { useAuth } from '@/contexts/AuthContext';
import UsersManagement from '@/components/UsersManagement/UsersManagement';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const UsersPage = () => {
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !isAdmin()) {
      redirect('/');
    }
  }, [user, isAdmin]);

  if (!user || !isAdmin()) {
    return null;
  }

  return (
    <div className="users-page">
      <UsersManagement />
    </div>
  );
};

export default UsersPage;
