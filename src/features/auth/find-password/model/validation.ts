import { z } from 'zod';

export const findPasswordSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요.').min(1, '이메일을 입력해주세요.'),
});

export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
