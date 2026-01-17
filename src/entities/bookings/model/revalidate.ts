'use client';

import { useQueryClient } from '@tanstack/react-query';
import { hostReservationQueryKeys } from '@/features/host/model/reservation/query-keys';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { bookingQueryKeys } from '@/features/bookings/model/query-keys';
import { useSseStore } from '@/processes/sse-session';
import { useChatStore } from '@/processes/chat-session/use-chat-store';
import { chatKeys } from '@/entities/chat/model/queries';
import { ChatMessage, ChatSSEMessage, ChatSSEMessagePayload } from '@/entities/chat/model/types';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

type AppSSEMessage =
  | { type: 'Reservation'; data?: { reservationId?: string } }
  | ChatSSEMessage
  | { type: 'heartbeat'; data?: { ts?: number } }
  | { type: string; [key: string]: unknown };

function isChatSSEMessage(msg: AppSSEMessage): msg is ChatSSEMessage {
  return (
    !!msg &&
    typeof msg === 'object' &&
    (msg as any).type === 'chat_message' &&
    typeof (msg as any).conversationId === 'string' &&
    (msg as any).message &&
    typeof (msg as any).message === 'object'
  );
}

export function useAppSSE(enabled: boolean) {
  const queryClient = useQueryClient();
  const addRealtimeMessage = useChatStore((s) => s.addRealtimeMessage);
  const resetKey = useSseStore((s) => s.resetKey);
  const mode = useUserStore((s) => s.mode);
  const role = mode === 'hosts' ? 'host' : 'user';

  useEventSource<AppSSEMessage>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled,
    withCredentials: true,
    resetKey,
    onMessage: (msg) => {
      console.log('sse', msg);
      if (!msg || typeof msg !== 'object' || typeof (msg as any).type !== 'string') return;

      if (isChatSSEMessage(msg)) {
        addRealtimeMessage(msg);
        queryClient.setQueryData(
          chatKeys.messages(role, msg.conversationId),
          (prev: ChatSSEMessagePayload[] | undefined) => {
            if (!prev) return [msg.message];
            if (prev.some((m) => m.id === msg.message.id)) return prev;
            return [...prev, msg.message];
          },
        );

        return;
      }

      switch ((msg as any).type) {
        case 'Reservation':
          queryClient.invalidateQueries({ queryKey: hostReservationQueryKeys.list() });
          queryClient.invalidateQueries({ queryKey: hostReservationQueryKeys.status() });
          queryClient.invalidateQueries({ queryKey: bookingQueryKeys.list() });
          queryClient.invalidateQueries({ queryKey: bookingQueryKeys.status() });
          return;
        case 'heartbeat':
          return;
        default:
          return;
      }
    },
  });
}
