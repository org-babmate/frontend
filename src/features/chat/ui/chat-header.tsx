'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChatHeaderProps {
  partnerName: string;
  partnerProfileImage?: string | null;
  onPartnerClick?: () => void;
}

export function ChatHeader({
  partnerName,
  partnerProfileImage,
  onPartnerClick,
}: ChatHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex flex-row items-center justify-between px-4 py-4 bg-white">
      <div className="flex flex-row items-center gap-3">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="w-6 h-6 flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* 상대방 정보 */}
        <button
          onClick={onPartnerClick}
          className="flex flex-row items-center gap-3"
        >
          {/* 프로필 이미지 */}
          <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {partnerProfileImage ? (
              <Image
                src={partnerProfileImage}
                alt={partnerName}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>

          {/* 이름 + 화살표 */}
          <div className="flex flex-row items-center gap-1">
            <span className="text-sm font-semibold text-gray-900">
              {partnerName}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-900" />
          </div>
        </button>
      </div>
    </header>
  );
}
