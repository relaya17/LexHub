import { Schema, model, type Document, type Types } from 'mongoose';

export interface ContractDocument extends Document {
  fileUrl: string;
  clientId: Types.ObjectId;
  lawyerId?: Types.ObjectId;
  report?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contractSchema = new Schema<ContractDocument>(
  {
    fileUrl: { type: String, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lawyerId: { type: Schema.Types.ObjectId, ref: 'User' },
    report: { type: String },
  },
  {
    timestamps: true,
  },
);

export const ContractModel = model<ContractDocument>('Contract', contractSchema);


