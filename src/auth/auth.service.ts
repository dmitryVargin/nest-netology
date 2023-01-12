import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Pick<User, 'email' | 'firstName'>> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = compareSync(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    const { lastName, password, ...data } = user;
    return data;
  }

  async login(user: Pick<UserDocument, '_id' | 'email' | 'firstName'>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
