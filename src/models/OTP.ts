import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  createdAt: Date;
}

const OtpSchema: Schema<IOtp> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0, // This setting lets MongoDB automatically delete the doc at 'expiresAt'
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const OTP: Model<IOtp> = mongoose.models.OTP || mongoose.model<IOtp>('OTP', OtpSchema);
