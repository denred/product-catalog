import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Unique email address of the user, used for authentication.',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user displayed in the profile and dashboard.',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'hashedpassword123',
    description: 'Hashed password of the user for secure storage.',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: 'admin',
    enum: ['admin', 'user'],
    description: 'Role of the user defining access level and permissions.',
  })
  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user account is active.',
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
