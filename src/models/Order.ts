import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderId: string; // Task ID
  orderName: string;
  clientId: mongoose.Types.ObjectId;
  staffId?: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  remarks: {
    text: string;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
  }[];
  documents: mongoose.Types.ObjectId[]; // Refs to Document model
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderName: {
      type: String,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    remarks: [
      {
        text: String,
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    documents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
