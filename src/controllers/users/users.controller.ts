import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { User } from '@models/user.model';
import { UsersService } from './users.service';


@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  saveUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @ApiOperation({ summary: 'Update an user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(user, id);
  }

  @ApiOperation({ summary: 'Delete an user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
