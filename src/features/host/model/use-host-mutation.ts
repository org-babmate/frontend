import {
  getHostIDProfile,
  registerMyHostProfile,
  updateMyHostProfile,
} from '@/entities/host/model/api';
import { HostProfile, HostProfileDetail } from '@/entities/host/model/types';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMyHostProfileQuery(isEdit?: boolean) {
  return useQuery({
    queryKey: ['myHostProfile'],
    queryFn: getHostIDProfile,
    enabled: isEdit,
    staleTime: 60_000,
  });
}

export function useMyHostRegisterMutation(onSuccess?: (data: HostProfile) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerMyHostProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myHostProfile'] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}

export function useMyHostUpdateMutation(onSuccess?: (data: HostProfile) => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyHostProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myHostProfile'] });
      onSuccess?.(data);
    },
    onError: (err) => console.error('onError', err),
  });
}
