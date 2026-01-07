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
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/ui/error';

export function useLoginForm(onSuccess?: (data: AuthResponse) => void) {
  const setAuthed = useAuthStore((s) => s.setAuthed);
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
      setAuthed(true);
      try {
        const profile = await getUserProfile();

        useUserStore.getState().setUser({
          ...profile,
          mode: profile.roles?.includes('Host') ? 'hosts' : 'users',
          isHost: profile.roles?.includes('Host') ?? false,
        });

        queryClient.setQueryData(['userProfile'], profile);
        onSuccess?.(data);
      } catch (e) {
        toast.error(`프로필 정보를 불러오지 못했습니다. ${getErrorMessage(e)}`);
      }
    },
    onError: (e) => {
      toast.error(getErrorMessage(e));
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
      clearAuth();
      clearUser();
    },
    onSuccess: () => {
      onSuccess?.();
      router.replace('/');
    },
    onError: () => {
      router.replace('/');
    },
  });
}
