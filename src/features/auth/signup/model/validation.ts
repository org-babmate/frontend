import { z } from 'zod';

const PASSWORD_SPECIAL_REGEX = /[@$!%*#?&]/;
const PASSWORD_NUMBER_REGEX = /\d/;

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(24, 'Password cannot be more than 24 characters.')
    .refine((value) => PASSWORD_SPECIAL_REGEX.test(value), {
      message: 'Password must include at least one special character (@$!%*#?&).',
    })
    .refine((value) => PASSWORD_NUMBER_REGEX.test(value), {
      message: 'Password must include at least one number.',
    }),
  name: z.string().min(1, 'Please enter your name or nickname.'),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
