import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: false },
    dateCreation: { type: Date, default: Date.now },
  },
  { versionKey: false },
);
