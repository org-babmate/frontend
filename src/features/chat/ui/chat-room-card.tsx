'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useUserStore } from '@/processes/profile-session/use-profile-store';

interface ChatRoomCardProps {
  id: string;
  partnerName: string;
  partnerProfileImage?: string | null;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
}

export function ChatRoomCard({
  id,
  partnerName,
  partnerProfileImage,
  lastMessage,
  lastMessageAt,
}: ChatRoomCardProps) {
  const timeAgo = lastMessageAt
    ? formatDistanceToNow(new Date(lastMessageAt), { addSuffix: false })
    : '';

  // 쿼리 파라미터로 partner 정보 전달
  const { mode } = useUserStore();
  const chatUrl = `${mode === 'hosts' ? '/host' : ''}/chat/${id}?partnerName=${encodeURIComponent(partnerName)}${partnerProfileImage ? `&partnerProfileImage=${encodeURIComponent(partnerProfileImage)}` : ''}`;

  return (
    <Link href={chatUrl} className="block">
      <div className="flex flex-row items-center gap-3 py-3">
        {/* 프로필 이미지 */}
        <div className="w-13 h-13 rounded-full bg-gray-100 overflow-hidden shrink-0">
          {partnerProfileImage ? (
            <Image
              src={partnerProfileImage}
              alt={partnerName}
              width={52}
              height={52}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {/* 이름 + 시간 */}
          <div className="flex flex-row justify-between items-center">
            <span className="text-base font-semibold text-gray-900 truncate">{partnerName}</span>
            {timeAgo && <span className="text-xs text-gray-400 shrink-0 ml-2">{timeAgo}</span>}
          </div>

          {/* 마지막 메시지 */}
          {lastMessage && (
            <p className="text-sm font-semibold text-gray-500 truncate">{lastMessage}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
