import { getHostIDProfile, registerMyHostProfile } from '@/entities/host/model/api';
import { HostProfile, HostProfileDetail } from '@/entities/host/model/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMyHostProfileQuery(onSuccess?: (data: HostProfileDetail) => void) {
  return useQuery({
    queryKey: ['myHostProfile'],
    queryFn: getHostIDProfile,
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
