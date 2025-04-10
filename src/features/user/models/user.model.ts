import bcrypt from 'bcryptjs';
import validator from 'validator';
import mongoose from 'mongoose';
import { IUser, UserRole } from '@/features/user/interfaces/user.interface';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Invalid email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      validate: [
        validator.isStrongPassword,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
      ],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password as string);
};

export const User = mongoose.model<IUser>('User', userSchema);
