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
    error: mutation.isError,
  };
}

//Log Out
export function useLogout(onSuccess?: () => void) {
  const { clearAuth } = useAuthStore();
  const { clearUser } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onMutate: () => {
      // 서버 성공/실패와 무관하게 로컬은 즉시 정리
      clearAuth();
      clearUser();
    },
    onSuccess: () => {
      onSuccess?.();
      router.replace('/');
    },
    onError: () => {
      // 이미 로컬 정리했으니 특별히 할 일 없음
      // 필요하면 토스트 정도만
      router.replace('/');
    },
  });
}
