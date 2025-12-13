import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfileImage } from '@/entities/user/model/api';
import type { UserProfileResponse } from '@/entities/user/model/types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { uploadImage } from '@/shared/api/image-upload/apis';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useUserProfileQuery(onSuccess?: (data: UserProfileResponse) => void) {
  const { accessToken } = useAuthStore();
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    enabled: !!accessToken,
  });
}

export function useUserProfileMutation(onSuccess?: (data: UserProfileResponse) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfileImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onSuccess?.(data);
    },
  });
}
