import {
  cancelBooking,
  getBooking,
  getBookingList,
  getBookingStautsCounts,
  registerBooking,
} from '@/entities/bookings/model/api';
import { BookingResponse, BookingStatusCount } from '@/entities/bookings/model/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useBookingQuery(id: string, onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(id),
  });
}
export function useBookingListQuery(onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: ['bookingList'],
    queryFn: getBookingList,
  });
}

export function useBookingStatusQuery(onSuccess?: (data: BookingStatusCount) => void) {
  return useQuery({
    queryKey: ['bookingStatus'],
    queryFn: getBookingStautsCounts,
  });
}
export function useRegisterBookingMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerBooking,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['booking'] }),
        queryClient.invalidateQueries({ queryKey: ['bookingList'] }),
        queryClient.invalidateQueries({ queryKey: ['bookingStatus'] }),
      ]);
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}

export function useCancelBookingMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['booking'] }),
        queryClient.invalidateQueries({ queryKey: ['bookingList'] }),
        queryClient.invalidateQueries({ queryKey: ['bookingStatus'] }),
      ]);
      onSuccess?.();
    },
    onError: (err) => console.error('onError', err),
  });
}
