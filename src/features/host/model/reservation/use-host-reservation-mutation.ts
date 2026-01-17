import { BookingResponse, BookingStatusCount } from '@/entities/bookings/model/types';
import {
  accpetReservation,
  getHostReservationDetail,
  getHostReservationList,
  getHostReservationStautsCounts,
  rejectReservation,
} from '@/entities/host/model/reservation/api';
import { hostReservationQueryKeys } from '@/features/host/model/reservation/query-keys';
import { getErrorMessage } from '@/shared/api/error';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useHostReservationQuery(onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: hostReservationQueryKeys.list(),
    queryFn: getHostReservationList,
  });
}

export function useHostReservationDetailQuery(
  id: string,
  onSuccess?: (data: BookingResponse) => void,
) {
  return useQuery({
    queryKey: hostReservationQueryKeys.detail(id),
    queryFn: () => getHostReservationDetail(id),
    enabled: Boolean(id),
  });
}

export function useHostReservationStatusQuery(onSuccess?: (data: BookingStatusCount) => void) {
  return useQuery({
    queryKey: hostReservationQueryKeys.status(),
    queryFn: getHostReservationStautsCounts,
  });
}

export function useAcceptReservationMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: accpetReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: hostReservationQueryKeys.all,
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useRejectReservationMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: hostReservationQueryKeys.all,
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
