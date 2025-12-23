import { z } from 'zod';

const PASSWORD_SPECIAL_REGEX = /[@$!%*#?&]/;
const PASSWORD_NUMBER_REGEX = /\d/;

export const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .refine((value) => PASSWORD_SPECIAL_REGEX.test(value), {
        message: '비밀번호에 특수문자 (@$!%*#?&)를 하나 이상 포함해야 합니다.',
      })
      .refine((value) => PASSWORD_NUMBER_REGEX.test(value), {
        message: '비밀번호에 숫자를 하나 이상 포함해야 합니다.',
      }),
    passwordConfirm: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    name: z.string().min(1, '이름(닉네임)을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
