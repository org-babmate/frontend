'use client';

import { useQueryClient } from '@tanstack/react-query';
import { hostReservationQueryKeys } from '@/features/host/model/reservation/query-keys';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { bookingQueryKeys } from '@/features/bookings/model/query-keys';

type ReservationSseMessage = {
  type: 'Reservation';
  data?: {
    reservationId?: string;
  };
};

type HeartbeatMessage = {
  type: 'heartbeat';
  data?: { ts?: number };
};

type SseMessage = ReservationSseMessage | HeartbeatMessage;

export function useHostReservationSse(enabled: boolean) {
  const queryClient = useQueryClient();

  useEventSource<SseMessage>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled,
    onMessage: (msg) => {
      if (!msg || typeof msg !== 'object') return;

      if (msg.type !== 'Reservation') return;

      console.log('Revalidated!! ');

      queryClient.invalidateQueries({ queryKey: hostReservationQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: hostReservationQueryKeys.status() });
      queryClient.invalidateQueries({ queryKey: bookingQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: bookingQueryKeys.status() });
    },
  });
}
