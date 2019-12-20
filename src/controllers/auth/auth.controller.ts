import { Controller, Post, Get, Body } from '@nestjs/common';

import { User } from './../../core/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('registration')
  registrationUser(@Body() user: User) {
    // return this.usersService.createUser(user);
  }

  @Get(':id')
  logoutUser() {
    // return this.usersService.createUser(user);
  }
}
