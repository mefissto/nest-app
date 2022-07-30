import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@models/user.model';
import { ForbiddenException } from '@exceptions/forbidden.exception';
import { UsersService } from '@controllers/users/users.service';
import { EmailService } from '@controllers/email/email.service';
import { EmailData } from '@models/email-data.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
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

  public async login(userDTO: User): Promise<{ access_token: string; user: User }> {
    const user: User = await this.userService.findOne(userDTO.email, true);

    if (!user) {
      throw new NotFoundException(`User ${userDTO.email} not found`);
    }

    const payload = { username: user.email, sub: user._id };

    return { access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }), user };
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

  public async resetPassword(email: string): Promise<any> {
    const user: User = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return Promise.resolve({ id: user._id });

    // TODO --> enable it when the emails are ready
    // const emailData = new EmailData({
    //   email,
    //   subject: 'Reset password confirmation',
    //   context: { name: user.username },
    // });

    // return this.emailService.sendEmail(emailData);
  }

  public async setNewPassword(userDto: User): Promise<User> {
    const user: User = await this.userService.findById(userDto._id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const hash = await this.userService.getHash(userDto.password);

    return this.userService.updateUser({ password: hash }, user._id);
  }
}
