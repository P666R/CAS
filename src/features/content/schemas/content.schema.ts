import { z } from 'zod';
import { ContentStatus } from '../interfaces/content.interface';

export const createContentSchema = z
  .object({
    title: z.string().trim().nonempty('Title is required').min(3, 'Title must be at least 3 characters'),
    body: z.string().trim().nonempty('Body is required').min(10, 'Body must be at least 10 characters'),
  })
  .strict();

export const updateContentSchema = z
  .object({
    status: z.nativeEnum(ContentStatus),
    rejectionReason: z
      .string()
      .trim()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: 'Rejection reason cannot be empty if provided',
      }),
  })
  .strict();

export type CreateContentDTO = z.infer<typeof createContentSchema>;
export type UpdateContentDTO = z.infer<typeof updateContentSchema>;
