import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    const savedUser = await createdUser.save();

    const { password, ...userWithoutPassword } = savedUser.toObject();

    return userWithoutPassword;
  }

  public async login(loginDto: LoginDto): Promise<Partial<User>> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  }

  public async findAll(): Promise<Partial<User>[]> {
    return this.userModel.find().select('-password').exec();
  }

  public async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  public async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  public async deactivate(id: string): Promise<Partial<User>> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
