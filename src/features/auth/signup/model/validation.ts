import { z } from 'zod';

const PASSWORD_SPECIAL_REGEX = /[@$!%*#?&]/;
const PASSWORD_NUMBER_REGEX = /\d/;

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .refine((value) => PASSWORD_SPECIAL_REGEX.test(value), {
      message: 'Password must include at least one special character (@$!%*#?&).',
    })
    .refine((value) => PASSWORD_NUMBER_REGEX.test(value), {
      message: 'Password must include at least one number.',
    }),
  // passwordConfirm: z.string().min(8, 'Password must be at least 8 characters long.'),
  name: z.string().min(1, 'Please enter your name or nickname.'),
});
// .refine((data) => data.password === data.passwordConfirm, {
//   message: 'Passwords do not match.',
//   path: ['passwordConfirm'],
// });

export type SignupFormValues = z.infer<typeof signupSchema>;
