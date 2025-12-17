'use client';

import Image from 'next/image';
import { formatDistanceToNow, format } from 'date-fns';
import { Button } from '@/shared/ui/button';

interface SystemMessageCardProps {
  experienceName: string;
  experienceImage?: string | null;
  reservationDate: string;
  startTime: string;
  endTime: string;
  message: string;
  createdAt: string;
  partnerProfileImage?: string | null;
  onViewDetails?: () => void;
}

export function SystemMessageCard({
  experienceName,
  experienceImage,
  reservationDate,
  startTime,
  endTime,
  message,
  createdAt,
  partnerProfileImage,
  onViewDetails,
}: SystemMessageCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: false });
  const formattedDate = format(new Date(reservationDate), 'd MMMM yyyy');

  return (
    <div className="flex flex-row items-start gap-2">
      {/* 프로필 이미지 */}
      <div className="w-6 h-6 rounded-full bg-gray-50 overflow-hidden flex-shrink-0">
        {partnerProfileImage ? (
          <Image
            src={partnerProfileImage}
            alt="partner"
            width={24}
            height={24}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-50" />
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        {/* 카드 */}
        <div className="w-[250px] p-3 bg-[#F3F3F5] rounded-lg flex flex-col gap-3">
          {/* 경험 정보 */}
          <div className="flex flex-row items-center gap-3">
            {/* 경험 이미지 */}
            <div className="w-[68px] h-[68px] rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              {experienceImage ? (
                <Image
                  src={experienceImage}
                  alt={experienceName}
                  width={68}
                  height={68}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100" />
              )}
            </div>

            {/* 경험 상세 */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-sm font-semibold text-gray-900">
                {experienceName}
              </span>
              <span className="text-sm text-gray-500">
                {formattedDate}
                <br />
                {startTime} - {endTime}
              </span>
            </div>
          </div>

          {/* 메시지 */}
          <p className="text-sm font-semibold text-gray-500">{message}</p>

          {/* 버튼 */}
          <Button
            onClick={onViewDetails}
            className="w-full bg-gray-900 text-white rounded-lg"
          >
            View Reservation Details
          </Button>
        </div>

        {/* 시간 */}
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>
    </div>
  );
}
