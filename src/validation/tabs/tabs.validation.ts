

import { z } from 'zod';

export const CreatePromptValidation = z.object({
  title: z.string().min(1, "Title is required"),
  prompt: z.string().min(1, "Prompt is required"),
  tags: z.array(z.string()).default([]), 
  image: z.string().optional(),
});