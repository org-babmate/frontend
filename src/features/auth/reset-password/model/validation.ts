import { z } from 'zod';

export const resetPasswordSchema = z.object({
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
        passwordConfirm: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
        
})  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

  export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;