'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useDeactivateUserMutation,
} from '@/store/users-api';
import { CreateUserDto } from '@/types/user';

import AddUserButton from '@/components/AddUserButton/AddUserButton';
import './styles.scss';

const UsersManagement = () => {
  const { isAdmin } = useAuth();

  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();

  const handleCreateUser = async (userData: CreateUserDto) => {
    try {
      await createUser(userData).unwrap();
      refetch();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string | undefined) => {
    if (!userId) return;

    try {
      await deleteUser(userId).unwrap();
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeactivateUser = async (userId: string | undefined) => {
    if (!userId) return;

    try {
      await deactivateUser(userId).unwrap();

      refetch();
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  if (!isAdmin()) {
    return (
      <div className="access-denied">
        Access denied. Admin privileges required.
      </div>
    );
  }

  if (isLoading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="users-management">
      <div className="users-header">
        <h1>Users Management</h1>
        <AddUserButton onAddUser={handleCreateUser} />
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="actions">
                  {user.isActive && (
                    <button
                      className="btn-warning"
                      onClick={() => handleDeactivateUser(user?._id || '')}
                    >
                      Deactivate
                    </button>
                  )}
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteUser(user?._id || '')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
