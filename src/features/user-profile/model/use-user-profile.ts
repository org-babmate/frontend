import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/entities/user/model/api';
import type { UserProfileResponse } from '@/entities/user/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export function useUserProfileQuery() {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });
}

export function useUserProfileMutation(onSuccess?: (data: UserProfileResponse) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}
