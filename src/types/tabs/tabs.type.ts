import { CreatePromptValidation } from '@/src/validation/tabs/tabs.validation';
import {z} from 'zod'

export type CreatePromptType = z.infer<typeof CreatePromptValidation>;
// EXTRACT TYPE FROM VALIDATION