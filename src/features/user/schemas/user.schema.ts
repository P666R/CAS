import { z } from 'zod';
import { UserRole } from '@/features/user/interfaces/user.interface';
import validator from 'validator';

export const createSignupSchema = z
  .object({
    username: z.string().nonempty('Username is required').trim().min(3, 'Username must be at least 3 characters'),
    email: z.string().nonempty('Email is required').trim().email('Invalid email').toLowerCase(),
    password: z
      .string()
      .nonempty('Password is required')
      .trim()
      .refine(() => validator.isStrongPassword, {
        message:
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
      }),
    role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
  })
  .strict();

export const createLoginSchema = createSignupSchema.pick({ email: true, password: true }).strict();

export type CreateSignupDTO = z.infer<typeof createSignupSchema>;
export type CreateLoginDTO = z.infer<typeof createLoginSchema>;
