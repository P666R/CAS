import mongoose from 'mongoose';

export enum ContentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

const contentSchema = new mongoose.Schema(
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
    },
  },
  {
    timestamps: true,
  },
);
