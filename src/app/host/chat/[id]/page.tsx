'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useChatMessagesQuery, useSendChatMessageMutation } from '@/entities/chat/model/queries';
import { ChatHeader } from '@/features/chat/ui/chat-header';
import { ChatDateDivider } from '@/features/chat/ui/chat-date-divider';
import { ChatBubble } from '@/features/chat/ui/chat-bubble';
import { ChatInput } from '@/features/chat/ui/chat-input';
import { useUserProfileQuery } from '@/features/user/model/user-profile-queries';
import { useAppSSE } from '@/entities/bookings/model/revalidate';
import { useAuthStore } from '@/processes/auth-session/use-auth-store';

export default function ChatRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const conversationId = params.id as string;
  const authed = useAuthStore((s) => s.authed);
  useAppSSE(authed);
  // URL 파라미터에서 partner 정보 가져오기
  const partnerName = searchParams.get('partnerName') || 'Host';
  const partnerProfileImage = searchParams.get('partnerProfileImage') || null;

  const { data: profile } = useUserProfileQuery();
  const { data: messages, isLoading } = useChatMessagesQuery(conversationId);
  const sendMessage = useSendChatMessageMutation(conversationId);

  // 현재 사용자 ID (내 메시지 판별용)
  const currentUserId = profile?.id || '';

  const handleSend = (content: string) => {
    sendMessage.mutate({ content });
  };

  // 메시지를 날짜별로 그룹화
  const groupedMessages = messages?.reduce(
    (acc, msg) => {
      const date = new Date(msg.createdAt).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(msg);
      return acc;
    },
    {} as Record<string, typeof messages>,
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-[#FAFAFA] ">
      {/* 채팅 헤더 */}
      <ChatHeader partnerName={partnerName} partnerProfileImage={partnerProfileImage} />

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4">
        {isLoading && <p className="text-gray-500 text-center py-4">Loading...</p>}

        {groupedMessages &&
          Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              {/* 날짜 구분선 */}
              <ChatDateDivider date={date} />

              {/* 메시지 목록 */}
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
      </div>

      {/* 입력창 */}
      <ChatInput onSend={handleSend} disabled={sendMessage.isPending} />
    </div>
  );
}
