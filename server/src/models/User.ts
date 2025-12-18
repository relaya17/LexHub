import { Schema, model, type Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  facebookId?: string;
  role: 'client' | 'lawyer';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: false },
    googleId: { type: String, required: false, index: true },
    facebookId: { type: String, required: false, index: true },
    role: { type: String, enum: ['client', 'lawyer'], required: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<UserDocument>('User', userSchema);


