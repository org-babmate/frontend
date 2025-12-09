import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from '@/entities/auth/model/api';
import type { AuthResponse } from '@/entities/auth/model/types';
import { loginSchema, type LoginFormValues } from './validation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export function useLoginForm(onSuccess?: (data: AuthResponse) => void) {
  const { setAccessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken) {
        setAccessToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      }
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
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
export function useLogout(onSuccess?: () => void) {
  const { clearAuth } = useAuthStore();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      onSuccess?.();
    },
  });
}
