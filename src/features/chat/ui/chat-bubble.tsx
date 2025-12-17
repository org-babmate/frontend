'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface ChatBubbleProps {
  content: string;
  createdAt: string;
  isMe: boolean;
  partnerProfileImage?: string | null;
}

export function ChatBubble({
  content,
  createdAt,
  isMe,
  partnerProfileImage,
}: ChatBubbleProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: false });

  // 내 메시지 (오른쪽)
  if (isMe) {
    return (
      <div className="flex flex-col items-end gap-2">
        <div className="max-w-[250px] px-3 py-3 bg-[#4B4B4B] rounded-lg">
          <p className="text-sm text-white leading-[160%]">{content}</p>
        </div>
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>
    );
  }

  // 상대방 메시지 (왼쪽)
  return (
    <div className="flex flex-row items-start gap-2">
      {/* 프로필 이미지 */}
      <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
        {partnerProfileImage ? (
          <Image
            src={partnerProfileImage}
            alt="partner"
            width={24}
            height={24}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-400" />
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <div className="max-w-[250px] px-3 py-3 bg-[#F3F3F5] rounded-lg">
          <p className="text-sm text-gray-500 leading-[160%]">{content}</p>
        </div>
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>
    </div>
  );
}
