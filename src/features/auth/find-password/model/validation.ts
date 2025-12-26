import { z } from 'zod';

export const findPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.').min(1, '이메일을 입력해주세요.'),
});

export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
