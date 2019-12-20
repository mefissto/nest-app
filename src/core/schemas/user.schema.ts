import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: Number, required: true },
  dateCreation: { type: Date, default: Date.now },
  role: Number,
});
