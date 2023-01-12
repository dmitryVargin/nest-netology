import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signin')
  async login(@Body() { email, password }) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('signup')
  async register(@Body() data) {
    const oldUser = await this.userService.findByEmail(data.email);
    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже зарегистрирован');
    }
    return this.userService.create(data);
  }
  @Get()
  getUsers(@Query() data) {
    return this.userService.findAll(data);
  }
  @Delete()
  dropUsers() {
    return this.userService.dropCollection();
  }
}
