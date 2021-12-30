import { Inject, Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/core/models/user.model';
import { DBModelsEnum } from "@database/db-models.enum";

@Injectable()
export class UsersService {
  constructor(@Inject(DBModelsEnum.USER_MODEL) private readonly userModel: Model<User>) {
  }

  async createUser(createUserDto: User): Promise<User> {
    const newUser = {
      ...createUserDto,
      password: await this.getHash(createUserDto.password),
    };
    const createdUser = new this.userModel(newUser);
    return await createdUser.save();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
        .find()
        .select('-password')
        .exec();
  }

  async findOne(value: any, avoidPassword?: boolean, propName: string = 'email'): Promise<User> {
    return await this.userModel.findOne({ [propName]: value }, `${avoidPassword ? '-password' : ''}`).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUser(user: User, id: string): Promise<Document<any, any, User> & User & { _id: number }> {
    return await this.userModel
        .findOneAndUpdate({ _id: id }, user, { new: true })
        .exec();
  }

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareHash(
      password: string | undefined,
      hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
