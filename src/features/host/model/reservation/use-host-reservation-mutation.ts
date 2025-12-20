import { BookingResponse, BookingStatusCount } from '@/entities/bookings/model/types';
import {
  accpetReservation,
  getHostReservationDetail,
  getHostReservationList,
  getHostReservationStautsCounts,
  rejectReservation,
} from '@/entities/host/model/reservation/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useHostReservationQuery(onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: ['hostReservationList'],
    queryFn: getHostReservationList,
  });
}

export function useHostReservationDetailQuery(
  id: string,
  onSuccess?: (data: BookingResponse) => void,
) {
  return useQuery({
    queryKey: ['hostReservation'],
    queryFn: () => getHostReservationDetail(id),
  });
}

export function useHostReservationStatusQuery(onSuccess?: (data: BookingStatusCount) => void) {
  return useQuery({
    queryKey: ['hostReservationStatus'],
    queryFn: getHostReservationStautsCounts,
  });
}

export function useAcceptReservationMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accpetReservation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['hostReservationList', 'hostReservation', 'hostReservationStatus'],
      });
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}

export function useRejectReservationMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectReservation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['hostReservationList', 'hostReservation', 'hostReservationStatus'],
      });
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}
