import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from '@/entities/auth/model/api';
import type { AuthResponse } from '@/entities/auth/model/types';
import { loginSchema, type LoginFormValues } from './validation';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { getUserProfile } from '@/entities/user/model/api';

export function useLoginForm(onSuccess?: (data: AuthResponse) => void) {
  //여기에 Profile을 받아야됨
  const { setAuthed } = useAuthStore();
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
    onSuccess: async (data) => {
      const profile = await getUserProfile();
      useUserStore.getState().setUser({
        ...profile,
        mode: profile.roles?.includes('Host') ? 'hosts' : 'users',
        isHost: profile.roles?.includes('Host') ?? false,
      });
      setAuthed(true);
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
  const { clearUser } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      clearUser();
      onSuccess?.();
      router.push('/');
    },
  });
}
