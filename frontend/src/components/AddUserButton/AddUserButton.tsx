'use client';
import { useState } from 'react';
import UserFormModal from '../UserFormModal/UserFormModal';

import './styles.scss';
import { CreateUserDto } from '@/types/user';

interface AddUserButtonProps {
  onAddUser: (user: CreateUserDto) => Promise<void>;
  className?: string;
}

const AddUserButton = ({ onAddUser, className = '' }: AddUserButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitUser = async (user: CreateUserDto) => {
    await onAddUser(user);
    setIsModalOpen(false);
  };

  return (
    <div className={className}>
      <button
        className="add-user-button"
        type="button"
        onClick={handleOpenModal}
      >
        <span className="plus-icon">+</span>
        Add User
      </button>

      <UserFormModal
        isOpen={isModalOpen}
        mode="create"
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
      />
    </div>
  );
};

export default AddUserButton;
