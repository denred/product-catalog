import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginDto } from '../users/dto/login.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/services/users.service';

export interface LoginResponse {
  user: Partial<User>;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

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

    const payload = { email: user.email, sub: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user.toObject() as Omit<User, 'password'> & {
      password: string;
    };

    return {
      user: userWithoutPassword,
      token,
    };
  }

  public async validateUser(payload: { sub: string; email: string; role: string }): Promise<any> {
    return this.usersService.findOne(payload.sub);
  }
}
