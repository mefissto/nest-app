import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './../../core/models/user.model';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  saveUser(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: User) {
    return this.usersService.updateUser(user, id);
  }
}
