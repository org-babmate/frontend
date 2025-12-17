export type SenderRole = 'Guest' | 'Host';
export type MessageType = 'User' | 'System';

export interface ChatPartner {
  id: string;
  name: string;
  profileImage: string | null;
}

export interface LastMessage {
  content: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  reservationId: string;
  hostId: string;
  guestId: string;
  createdAt: string;
  partner: ChatPartner;
  lastMessage: LastMessage | null;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: SenderRole;
  type: MessageType;
  content: string;
  createdAt: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface ChatSSEMessagePayload {
  id: string;
  senderId: string;
  senderRole: SenderRole;
  content: string;
  createdAt: string;
}

export interface ChatSSEMessage {
  type: 'chat_message';
  conversationId: string;
  message: ChatSSEMessagePayload;
}
