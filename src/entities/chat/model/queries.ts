import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChatRooms, getChatMessages, sendChatMessage } from './api';
import { SendMessageRequest } from './types';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

type ChatRole = 'user' | 'host';

export const chatKeys = {
  all: ['chat'] as const,
  rooms: (role: ChatRole) => [...chatKeys.all, role, 'rooms'] as const,
  messages: (role: ChatRole, conversationId: string) =>
    [...chatKeys.all, role, 'messages', conversationId] as const,
};

export function useChatRoomsQuery() {
  const authed = useAuthStore((s) => s.authed);
  const mode = useUserStore((s) => s.mode);
  const role: ChatRole = mode === 'hosts' ? 'host' : 'user';

  return useQuery({
    queryKey: [...chatKeys.rooms(role), authed],
    queryFn: () => getChatRooms(role),
    enabled: !!authed,
  });
}

export function useChatMessagesQuery(conversationId: string) {
  const mode = useUserStore((s) => s.mode);
  const role: ChatRole = mode === 'hosts' ? 'host' : 'user';

  return useQuery({
    queryKey: chatKeys.messages(role, conversationId),
    queryFn: () => getChatMessages(role, conversationId),
    enabled: !!conversationId,
  });
}

export function useSendChatMessageMutation(conversationId: string) {
  const queryClient = useQueryClient();
  const mode = useUserStore((s) => s.mode);
  const role: ChatRole = mode === 'hosts' ? 'host' : 'user';

  return useMutation({
    mutationFn: (data: SendMessageRequest) => sendChatMessage(role, conversationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.messages(role, conversationId) });
    },
  });
}
