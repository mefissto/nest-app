import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@models/user.model';
import { ForbiddenException } from '@exceptions/forbidden.exception';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UsersService,
      private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const isPassRight = await this.userService.compareHash(pass, user.password);

    if (isPassRight) {
      const { password, ...result } = user;
      return result as User;
    } else {
      throw new ForbiddenException('Invalid password!');
    }
  }

  public async login(userDTO: User): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(userDTO.email, true);

    if (!user) {
      throw new NotFoundException(`User ${userDTO.email} not found`);
    }

    const payload = { username: user.email, sub: user._id };

    return { access_token: this.jwtService.sign(payload) };

  }

  public async registration(userDTO: User): Promise<void> {
    const userExists = !!(await this.userService.findOne(userDTO.email));

    if (userExists) {
      throw new ForbiddenException('User already exists!');
    }

    await this.userService.createUser(userDTO);

    return null;
  }

  public async getUserInfoByToken(jwt: string): Promise<User> {
    const token = jwt.replace('Bearer ', '');
    const { sub } = this.jwtService.decode(token, { json: true });
    return await this.userService.findById(sub);
  }
}
