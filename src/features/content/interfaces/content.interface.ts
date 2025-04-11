import { Types, FilterQuery } from 'mongoose';

export enum ContentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface IContent {
  _id: Types.ObjectId;
  title: string;
  body: string;
  status: ContentStatus;
  submittedBy: Types.ObjectId;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ContentFilter = FilterQuery<IContent>;
