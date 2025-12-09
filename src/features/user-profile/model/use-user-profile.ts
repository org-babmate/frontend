import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/entities/user/model/api';
import type { UserProfileResponse } from '@/entities/user/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export function useUserProfileQuery(onSuccess?: (data: UserProfileResponse) => void) {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: !!accessToken,
  });
}
