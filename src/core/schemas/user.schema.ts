import * as mongoose from 'mongoose';
import { UserRolesEnum } from "../enums/user-roles.enum";

export const UserSchema = new mongoose.Schema(
    {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      dateCreation: { type: Date, default: Date.now },
      role: { type: Number, default: UserRolesEnum.User },
    },
    { versionKey: false },
);
