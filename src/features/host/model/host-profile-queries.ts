import {
  getHostIDProfile,
  getHostList,
  getMyHostProfile,
  registerMyHostProfile,
  updateMyHostProfile,
} from '@/entities/host/model/api';
import { HostProfile } from '@/entities/host/model/types';
import { useHostStore } from '@/processes/profile-session/use-host-profile-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { getErrorMessage } from '@/shared/ui/error';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useMyHostProfileQuery(enabled?: boolean) {
  const id = useUserStore((s) => s.id);
  const setHost = useHostStore((s) => s.setHost);
  const query = useQuery({
    queryKey: ['myHostProfile', id],
    queryFn: getMyHostProfile,
    staleTime: 60_000,
    enabled,
  });

  useEffect(() => {
    if (query.data) setHost(query.data.host);
  }, [query.data, setHost]);
  return query;
}

export function useHostProfileQuery(id: string, isEdit?: boolean) {
  return useQuery({
    queryKey: ['hostProfile', id],
    queryFn: () => getHostIDProfile(id),
    enabled: isEdit,
    staleTime: 60_000,
  });
}

export function useHostListInfiniteQuery(limit = 20) {
  const queryKey = ['hostProfileList', limit] as const;
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getHostList({ cursor: pageParam, limit }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.nextCursor;
    },
  });
}

export function useMyHostRegisterMutation(onSuccess?: (data: HostProfile) => void) {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();
  const { setHost } = useHostStore();
  return useMutation({
    mutationFn: registerMyHostProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['myHostProfile'] });
      setUser({ isHost: true });
      setHost({ ...data });
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
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
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
