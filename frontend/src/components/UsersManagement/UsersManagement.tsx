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
import { UserRole } from '@/enums';
import './styles.scss';

const UsersManagement = () => {
  const { isAdmin } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<CreateUserDto>({
    email: '',
    name: '',
    password: '',
    role: UserRole.USER,
  });

  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUser).unwrap();
      setIsCreateModalOpen(false);
      setNewUser({ email: '', name: '', password: '', role: UserRole.USER });
      refetch();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeactivateUser = async (userId: string) => {
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
        <button
          className="btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add User
        </button>
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
              <tr key={user.id}>
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
                      onClick={() => handleDeactivateUser(user.id)}
                    >
                      Deactivate
                    </button>
                  )}
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCreateModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New User</h2>
              <button
                className="close-button"
                onClick={() => setIsCreateModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                  minLength={6}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as UserRole,
                    })
                  }
                  className="form-select"
                >
                  <option value={UserRole.USER}>User</option>
                  <option value={UserRole.ADMIN}>Admin</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
