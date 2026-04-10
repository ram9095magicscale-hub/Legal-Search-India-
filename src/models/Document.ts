import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  fileUrl: string; // URL to storage (e.g. S3/Cloudinary)
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  category: 'GST' | 'FSSAI' | 'Trademark' | 'PAN' | 'Other';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema<IDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    category: {
      type: String,
      enum: ['GST', 'FSSAI', 'Trademark', 'PAN', 'Other'],
      default: 'Other',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DocumentModel: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>('Document', DocumentSchema);
