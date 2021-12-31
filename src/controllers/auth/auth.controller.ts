import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@models/user.model';
import { AuthService } from './auth.service';
import { LoginResponse } from "@models/login-response.model";

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: 'Get active user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(AuthGuard('jwt'))
  @Get('active-user')
  getUserInfoByToken(@Headers('authorization') token: string): Promise<User> {
    return this.authService.getUserInfoByToken(token);
  }

  @ApiOperation({ summary: 'Log in an user' })
  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  @UseGuards(AuthGuard('loginStrategy'))
  @HttpCode(200)
  @Post('login')
  async login(@Body() user: User) {
    return await this.authService.login(user);
  }

  @ApiOperation({ summary: 'Register an user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('registration')
  async registrationUser(@Body() user: User) {
    return await this.authService.registration(user);
  }
}
