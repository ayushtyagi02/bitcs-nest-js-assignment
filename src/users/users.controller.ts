import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.usersService.create(username, password);
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }
}
