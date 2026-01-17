'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/entities/user/model/api';
import type { UserProfileResponse } from '@/entities/user/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/api/error';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useEffect } from 'react';

export function useUserProfileQuery(options?: { enabled?: boolean }) {
  const authed = useAuthStore((s) => s.authed);
  const setUser = useUserStore((s) => s.setUser);
  const enabled = options?.enabled ?? authed;

  const query = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled,
  });

  useEffect(() => {
    if (query.data) setUser(query.data);
  }, [query.data, setUser]);

  return query;
}

export function useUserProfileMutation(onSuccess?: (data: UserProfileResponse) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
