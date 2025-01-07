import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
    },
    weight: {
      type: Number,
      default: 0,
      min: 0,
    },
    sportTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    waterNorm: {
      type: Number,
      default: 2.0,
      min: 0,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
