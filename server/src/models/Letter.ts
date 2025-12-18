import { Schema, model, type Document, type Types } from 'mongoose';

export interface LetterDocument extends Document {
  type: string;
  content: string;
  clientId: Types.ObjectId;
  lawyerId?: Types.ObjectId;
  status: 'draft' | 'sent' | 'reviewed';
  createdAt: Date;
  updatedAt: Date;
}

const letterSchema = new Schema<LetterDocument>(
  {
    type: { type: String, required: true },
    content: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lawyerId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['draft', 'sent', 'reviewed'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

export const LetterModel = model<LetterDocument>('Letter', letterSchema);


