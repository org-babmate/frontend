import { getHomeFeed } from '@/entities/home/model/api';
import { HomeResponse } from '@/entities/home/model/type';
import { useQuery } from '@tanstack/react-query';

export function useHomeFeedQuery(onSuccess?: (data: HomeResponse) => void) {
  return useQuery({
    queryKey: ['homeFeed'],
    queryFn: getHomeFeed,
  });
}
