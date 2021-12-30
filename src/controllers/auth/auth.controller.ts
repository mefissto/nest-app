import { Body, Controller, Get, Headers, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@models/user.model';
import { AuthService } from './auth.service';

@Controller('api/auth')
@ApiTags('Auth')
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
    console.log("-> user", user);
    return await this.authService.registration(user);
  }
}
