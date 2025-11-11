import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Unique email address of the user used for login.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user.',
  })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for the user account (minimum 6 characters).',
  })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Role of the user in the system (default: user).',
    enum: ['admin', 'user'],
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Role must be a string.' })
  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user.' })
  role?: string;
}
