import {z} from 'zod'
import { GenderEnum } from "@/src/types/user/user.types";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be under 50 characters')
    .trim(),
  bio: z
    .string()
    .max(160, 'Bio must be under 160 characters')
    .optional()
    .default(''),
  gender: z.nativeEnum(GenderEnum),
  tags: z
    .array(z.string())
    .max(8, 'You can add up to 8 tags')
    .default([]),
});