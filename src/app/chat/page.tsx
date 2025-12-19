'use client';

import Header from '@/shared/ui/header';
import { ChatRoomCard } from '@/features/chat/ui/chat-room-card';
import { useChatRoomsQuery } from '@/entities/chat/model/queries';

export default function ChatListPage() {
  const { data: chatRooms, isLoading, error } = useChatRoomsQuery();

  return (
    <div className="-mx-4 md:-mx-60">
      <Header withSignIn={true} />
      <div className="pt-[56px] px-5">
        {/* My message 타이틀 */}
        <div className="pt-5 pb-2">
          <h1 className="text-[22px] font-semibold text-gray-900">My message</h1>
        </div>

        {/* 채팅방 목록 */}
        <div className="flex flex-col">
          {isLoading && <p className="text-gray-500 text-center py-4">Loading...</p>}

          {error && <p className="text-red-500 text-center py-4">Failed to load chats</p>}

          {chatRooms && chatRooms.length === 0 && (
            <p className="text-gray-500 text-center py-4">No messages yet</p>
          )}

          {chatRooms?.map((room, index) => (
            <div key={room.id}>
              <ChatRoomCard
                id={room.id}
                partnerName={room.partner.name}
                partnerProfileImage={room.partner.profileImage}
                lastMessage={room.lastMessage?.content}
                lastMessageAt={room.lastMessage?.createdAt}
              />
              {index < chatRooms.length - 1 && <div className="border-b border-gray-100" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
