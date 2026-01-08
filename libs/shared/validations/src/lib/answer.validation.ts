import { z } from 'zod';
export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { message: 'Answer has to have more then 100 characters' }),
});
