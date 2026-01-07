import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/entities/user/model/api';
import type { UserProfileResponse } from '@/entities/user/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/ui/error';

export function useUserProfileQuery(options?: { enabled?: boolean }) {
  const { authed } = useAuthStore();
  const enabled = options?.enabled ?? authed;
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled,
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
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
