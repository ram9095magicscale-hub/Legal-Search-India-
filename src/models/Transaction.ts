import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITransaction extends Document {
  transactionId: string;
  amount: number;
  clientId: mongoose.Types.ObjectId;
  orderId?: mongoose.Types.ObjectId;
  status: 'pending' | 'success' | 'failed';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
