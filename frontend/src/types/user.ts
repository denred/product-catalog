import { UserRole } from '@/enums';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive?: boolean;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
