'use client';

import { useCallback, useMemo } from 'react';
import { useEventSource } from '@/shared/lib/hooks/use-sse-connection';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useChatStore } from '@/processes/chat-session/use-chat-store';
import { ChatSSEMessage } from '@/entities/chat/model/types';

type SSEMessage = ChatSSEMessage | { type: string; [key: string]: unknown };

export function useChatSSE() {
  const { accessToken } = useAuthStore();
  const { addRealtimeMessage } = useChatStore();

  const enabled = useMemo(() => Boolean(accessToken), [accessToken]);

  const handleMessage = useCallback(
    (data: SSEMessage) => {
      // 채팅 메시지만 필터링
      if (data.type === 'chat_message') {
        addRealtimeMessage(data as ChatSSEMessage);
      }
    },
    [addRealtimeMessage],
  );

  const { state, close } = useEventSource<SSEMessage>({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse`,
    enabled,
    withCredentials: true,
    onMessage: handleMessage,
  });

  return { state, close };
}
