import mongoose from 'mongoose';
import { ContentStatus, IContent } from '../interfaces/content.interface';

const contentSchema = new mongoose.Schema<IContent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(ContentStatus),
      default: ContentStatus.PENDING,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Submitted by is required'],
    },
    rejectionReason: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Content = mongoose.model<IContent>('Content', contentSchema);
