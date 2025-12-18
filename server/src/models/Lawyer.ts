import { Schema, model, type Document } from 'mongoose';

export interface LawyerDocument extends Document {
  name: string;
  email: string;
  specialization: string[];
  region: string;
  pricePerHour?: number;
  pricePerLetter?: number;
  rating?: number;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const lawyerSchema = new Schema<LawyerDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    specialization: [{ type: String, required: true }],
    region: { type: String, required: true },
    pricePerHour: { type: Number },
    pricePerLetter: { type: Number },
    rating: { type: Number, min: 0, max: 5 },
    bio: { type: String },
  },
  {
    timestamps: true,
  },
);

export const LawyerModel = model<LawyerDocument>('Lawyer', lawyerSchema);


