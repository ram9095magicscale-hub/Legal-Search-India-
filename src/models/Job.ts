import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IJob extends Document {
  role: string;
  department: string;
  location: string;
  type: string;
  desc: string;
  requirements: string[];
  salaryRange?: string;
  status: 'Open' | 'Closed' | 'Hidden';
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      default: 'Full-Time',
    },
    desc: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'Hidden'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Job) {
  delete mongoose.models.Job;
}

export const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema);
