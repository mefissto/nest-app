import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@models/user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  saveUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(user, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
