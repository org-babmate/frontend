import {
  getHostIDProfile,
  getMyHostProfile,
  registerMyHostProfile,
  updateMyHostProfile,
} from '@/entities/host/model/api';
import { HostProfile } from '@/entities/host/model/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMyHostProfileQuery(isEdit?: boolean) {
  return useQuery({
    queryKey: ['myHostProfile'],
    queryFn: getMyHostProfile,
    enabled: isEdit,
    staleTime: 60_000,
  });
}

export function useHostProfileQuery(id: string, isEdit?: boolean) {
  return useQuery({
    queryKey: ['hostProfile'],
    queryFn: () => getHostIDProfile(id),
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
