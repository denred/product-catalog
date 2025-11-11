import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address used to log in.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password associated with the user account.',
  })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
