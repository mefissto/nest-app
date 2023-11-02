import * as mongoose from 'mongoose';
import { UserRolesEnum } from '../enums/user-roles.enum';

export const UserSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.Types.ObjectId, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    role: { type: String, default: UserRolesEnum.User },
  },
  { versionKey: false }
);

// Duplicate the ID field.
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized.
UserSchema.set('toJSON', { virtuals: true });
