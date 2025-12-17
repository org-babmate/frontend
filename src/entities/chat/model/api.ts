import { apiClient } from '@/shared/api/client';
import { ChatRoom, ChatMessage, SendMessageRequest } from './types';

type ChatRole = 'user' | 'host';

function getPrefix(role: ChatRole): string {
  return role === 'host' ? '/host/chat' : '/user/chat';
}

// GET /{role}/chat - 채팅방 목록 조회
export async function getChatRooms(role: ChatRole): Promise<ChatRoom[]> {
  const res = await apiClient.get<ChatRoom[]>(getPrefix(role));
  return res.data;
}

// GET /{role}/chat/{id}/messages - 메시지 목록 조회
export async function getChatMessages(role: ChatRole, conversationId: string): Promise<ChatMessage[]> {
  const res = await apiClient.get<ChatMessage[]>(`${getPrefix(role)}/${conversationId}/messages`);
  return res.data;
}

// POST /{role}/chat/{id}/messages - 메시지 전송
export async function sendChatMessage(
  role: ChatRole,
  conversationId: string,
  data: SendMessageRequest,
): Promise<ChatMessage> {
  const res = await apiClient.post<ChatMessage>(
    `${getPrefix(role)}/${conversationId}/messages`,
    data,
  );
  return res.data;
}
