import { getHostIDProfile } from '@/entities/host/model/api';
import { HostProfileDetail } from '@/entities/host/model/types';
import { useQuery } from '@tanstack/react-query';

export function useMyHostProfileQuery(onSuccess?: (data: HostProfileDetail) => void) {
  return useQuery({
    queryKey: ['myHostProfile'],
    queryFn: getHostIDProfile,
  });
}
