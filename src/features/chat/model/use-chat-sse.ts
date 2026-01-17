'use client';

import { useCallback } from 'react';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useChatStore } from '@/processes/chat-session/use-chat-store';
import { ChatSSEMessage } from '@/entities/chat/model/types';
import { useSseStore } from '@/processes/sse-session';

type SSEMessage = ChatSSEMessage | { type: string; [key: string]: unknown };

export function useChatSSE() {
  const { authed } = useAuthStore();
  const { addRealtimeMessage } = useChatStore();

  const handleMessage = useCallback(
    (data: SSEMessage) => {
      if (data.type === 'chat_message') {
        addRealtimeMessage(data as ChatSSEMessage);
      }
    },
    [addRealtimeMessage],
  );

  const resetKey = useSseStore((s) => s.resetKey);
  const { state, close } = useEventSource<SSEMessage>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled: authed,
    withCredentials: true,
    resetKey,
    onMessage: handleMessage,
  });

  return { state, close };
}
