import {
  cancelBooking,
  getBooking,
  getBookingList,
  getBookingStautsCounts,
  registerBooking,
} from '@/entities/bookings/model/api';
import type { BookingResponse, BookingStatusCount } from '@/entities/bookings/model/types';
import { bookingQueryKeys } from '@/features/bookings/model/query-keys';
import { getErrorMessage } from '@/shared/api/error';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useBookingQuery(id: string, onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: bookingQueryKeys.detail(id),
    queryFn: () => getBooking(id),
    enabled: Boolean(id),
  });
}

export function useBookingListQuery(onSuccess?: (data: BookingResponse) => void) {
  return useQuery({
    queryKey: bookingQueryKeys.list(),
    queryFn: getBookingList,
  });
}

export function useBookingStatusQuery(onSuccess?: (data: BookingStatusCount) => void) {
  return useQuery({
    queryKey: bookingQueryKeys.status(),
    queryFn: getBookingStautsCounts,
  });
}

export function useRegisterBookingMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookingQueryKeys.all });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useCancelBookingMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookingQueryKeys.all });
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
