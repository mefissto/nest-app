import { Controller, Post, Body, UseGuards, HttpCode, Get, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './../../core/models/user.model';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('active-user')
  getUserInfoByToken(@Headers('authorization') token: string): Promise<User> {
    return this.authService.getUserInfoByToken(token);
  }

  @UseGuards(AuthGuard('loginStrategy'))
  @HttpCode(200)
  @Post('login')
  async login(@Body() user: User) {
    return await this.authService.login(user);
  }

  @Post('registration')
  async registrationUser(@Body() user: User) {
    return await this.authService.registration(user);
  }
}
