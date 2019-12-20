import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../core/models/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: User): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return await createdCat.save();
  }

  async login(userDTO: User) {
    const user = await this.userModel.findOne({ email: userDTO.email }).exec();
    console.log('user: ', user);
    if (!user) {
      throw new NotFoundException(`User ${userDTO.email} not found`);
    }
    return;
  }
}
