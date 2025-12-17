'use client';

import { create } from 'zustand';
import { ChatMessage, ChatSSEMessage } from '@/entities/chat/model/types';

type ChatState = {
  // 현재 활성화된 채팅방 ID
  activeConversationId: string | null;
  // SSE로 수신된 실시간 메시지 (conversationId별로 관리)
  realtimeMessages: Record<string, ChatMessage[]>;
};

type ChatActions = {
  setActiveConversation: (conversationId: string | null) => void;
  addRealtimeMessage: (sseMessage: ChatSSEMessage) => void;
  clearRealtimeMessages: (conversationId: string) => void;
  clearAllRealtimeMessages: () => void;
};

export type ChatStoreState = ChatState & ChatActions;

export const useChatStore = create<ChatStoreState>()((set) => ({
  activeConversationId: null,
  realtimeMessages: {},

  setActiveConversation: (conversationId) =>
    set({ activeConversationId: conversationId }),

  addRealtimeMessage: (sseMessage) =>
    set((state) => {
      const { conversationId, message } = sseMessage;
      const existing = state.realtimeMessages[conversationId] || [];

      // 중복 메시지 방지
      if (existing.some((m) => m.id === message.id)) {
        return state;
      }

      const newMessage: ChatMessage = {
        id: message.id,
        conversationId,
        senderId: message.senderId,
        senderRole: message.senderRole,
        type: 'User',
        content: message.content,
        createdAt: message.createdAt,
      };

      return {
        realtimeMessages: {
          ...state.realtimeMessages,
          [conversationId]: [...existing, newMessage],
        },
      };
    }),

  clearRealtimeMessages: (conversationId) =>
    set((state) => ({
      realtimeMessages: {
        ...state.realtimeMessages,
        [conversationId]: [],
      },
    })),

  clearAllRealtimeMessages: () => set({ realtimeMessages: {} }),
}));
