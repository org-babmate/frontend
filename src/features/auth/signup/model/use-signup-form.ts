import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/entities/auth/model/api';
import type { AuthResponse } from '@/entities/auth/model/types';
import { signupSchema, type SignupFormValues } from './validation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export function useSignupForm(onSuccess?: (data: AuthResponse) => void) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      const { passwordConfirm, ...payload } = values;
      return signup(payload);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    form,
    handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
