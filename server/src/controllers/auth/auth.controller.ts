import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@models/user.model';
import { LoginResponse } from '@models/login-response.model';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get active user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard('jwt'))
  @Get('active-user')
  getUserInfoByToken(@Headers('authorization') token: string): Promise<User> {
    return this.authService.getUserInfoByToken(token);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in an user' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  @UseGuards(AuthGuard('loginStrategy'))
  async login(@Body() user: User): Promise<{ access_token: string; user: User }> {
    return await this.authService.login(user);
  }

  @Post('registration')
  @ApiOperation({ summary: 'Register an user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async registrationUser(@Body() user: User) {
    return await this.authService.registration(user);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: HttpStatus.OK })
  async resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Patch('set-new-password')
  @ApiOperation({ summary: 'Set new password' })
  @ApiResponse({ status: HttpStatus.OK })
  async setNewPassword(@Body() user: User) {
    return this.authService.setNewPassword(user);
  }
}
