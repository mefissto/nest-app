import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: User): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return await createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(user: User, id: string): Promise<User[]> {
    return await this.userModel
      .findOneAndUpdate({ _id: id }, user, { new: true })
      .exec();
  }
}
