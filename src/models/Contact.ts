import mongoose, { Schema, model, models } from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Clear existing model to prevent issues in development
if (mongoose.models.Contact) {
  delete mongoose.models.Contact;
}

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
