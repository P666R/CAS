import { Document } from 'mongoose';

export function excludeFields<T extends Document, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !fields.includes(key as K))) as Omit<T, K>;
}
