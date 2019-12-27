import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../core/models/user.model';
import { ForbiddenException } from './../../core/exceptions/forbidden.exception';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email);
    const isPassRight = await this.userService.compareHash(pass, user.password);

    if (user && isPassRight) {
      const { password, ...result } = user;
      return result as User;
    }

    return null;
  }

  async login(userDTO: User): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(userDTO.email);

    if (!user) {
      throw new NotFoundException(`User ${userDTO.email} not found`);
    }

    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(userDTO: User): Promise<void> {
    const isUserExist = !!(await this.userService.findOne(userDTO.email));

    if (isUserExist) {
      throw new ForbiddenException();
    }

    await this.userService.createUser(userDTO);

    return null;
  }
}
