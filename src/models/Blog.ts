import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlogContent {
  type: 'h2' | 'h3' | 'p' | 'image' | 'ul' | 'ol' | 'list';
  text?: string;
  url?: string;
  items?: string[];
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  tag: string;
  desc: string;
  date: string;
  readTime: string;
  image: string;
  content: IBlogContent[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: [
      {
        type: {
          type: String,
          enum: ['h2', 'h3', 'p', 'image', 'ul', 'ol', 'list'],
          required: true,
        },
        text: {
          type: String,
        },
        url: {
          type: String,
        },
        items: {
          type: [String],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Clear existing model to prevent issues in development
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);
