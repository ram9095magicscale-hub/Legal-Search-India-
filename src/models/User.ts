import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: 'client' | 'admin' | 'staff';
  phone?: string;
  businessName?: string;
  photo?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  assignedAgent?: mongoose.Types.ObjectId;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
    },
    role: {
      type: String,
      enum: ['client', 'admin', 'staff'],
      default: 'client',
    },
    phone: {
      type: String,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    assignedAgent: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Clear existing model to prevent enum caching issues in development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
