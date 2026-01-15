'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useChatMessagesQuery, useSendChatMessageMutation } from '@/entities/chat/model/queries';
import { ChatHeader } from '@/features/chat/ui/chat-header';
import { ChatDateDivider } from '@/features/chat/ui/chat-date-divider';
import { ChatBubble } from '@/features/chat/ui/chat-bubble';
import { ChatInput } from '@/features/chat/ui/chat-input';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import { useAppSSE } from '@/entities/bookings/model/revalidate';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export default function HostChatRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const conversationId = params.id as string;

  const authed = useAuthStore((s) => s.authed);
  useAppSSE(authed);

  const partnerName = searchParams.get('partnerName') || 'Host';
  const partnerProfileImage = searchParams.get('partnerProfileImage') || null;

  const { data: profile } = useUserProfileQuery();
  const { data: messages, isLoading, isSuccess } = useChatMessagesQuery(conversationId);
  const sendMessage = useSendChatMessageMutation(conversationId);

  const currentUserId = profile?.id || '';

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const didInitialScrollRef = useRef(false);

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    bottomRef.current?.scrollIntoView({ block: 'end', behavior });
  };

  const isNearBottom = () => {
    const el = scrollAreaRef.current;
    if (!el) return true;
    const threshold = 120;
    return el.scrollHeight - (el.scrollTop + el.clientHeight) < threshold;
  };

  const groupedMessages = useMemo(() => {
    return messages?.reduce(
      (acc, msg) => {
        const date = new Date(msg.createdAt).toDateString();
        (acc[date] ||= []).push(msg);
        return acc;
      },
      {} as Record<string, typeof messages>,
    );
  }, [messages]);

  const handleSend = (content: string) => {
    sendMessage.mutate({ content });
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (!messages?.length) return;
    if (didInitialScrollRef.current) return;

    didInitialScrollRef.current = true;
    requestAnimationFrame(() => scrollToBottom('auto'));
  }, [isSuccess, messages?.length]);

  useEffect(() => {
    if (!didInitialScrollRef.current) return;
    if (!messages?.length) return;

    if (!isNearBottom()) return;
    requestAnimationFrame(() => scrollToBottom('auto'));
  }, [messages?.length]);

  return (
    <div className="flex flex-col w-dvw h-dvh bg-[#FAFAFA]">
      <ChatHeader partnerName={partnerName} partnerProfileImage={partnerProfileImage} />
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto px-4 mb-2">
        {isLoading && <p className="text-gray-500 text-center py-4">Loading...</p>}
        {groupedMessages &&
          Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              <ChatDateDivider date={date} />
              <div className="flex flex-col gap-5">
                {msgs?.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    content={msg.content}
                    createdAt={msg.createdAt}
                    isMe={msg.senderId === currentUserId}
                    partnerProfileImage={partnerProfileImage}
                  />
                ))}
              </div>
            </div>
          ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={sendMessage.isPending} />
    </div>
  );
}
