'use client';

import { useParams, useRouter } from 'next/navigation';
import { useExperienceDetailQuery } from '@/entities/experiences/model/queries';
import { ExperienceDetail } from '@/entities/experiences/model/types';
import { ImageCarousel } from '@/shared/ui/carousel';
import { ChevronLeft, Clock, MapPin, Users, Languages, Share, Heart } from 'lucide-react';
import Image from 'next/image';

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: experience, isLoading, isError } = useExperienceDetailQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError || !experience) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white gap-4">
        <p className="text-gray-500">Failed to load experience details.</p>
        <button
          onClick={() => router.back()}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 font-['Pretendard']">
      <div className="relative w-[calc(100%+32px)] -mx-4 h-[367px] bg-[#EAEBEF]">
        <button
          onClick={() => router.back()}
          className="absolute top-[31px] left-[20px] w-[24px] h-[24px] z-20 flex items-center justify-center p-0"
          aria-label="Go back"
        >
          <ChevronLeft className="w-full h-full text-white drop-shadow-md" strokeWidth={2.5} />
        </button>

        <ImageCarousel
          // images={experience.photos || []}
          images={['/a.jpg', '/a.jpg', '/a.jpg', '/a.jpg']}
          height="367px"
          title={experience.title}
        />
      </div>

      <div className="flex flex-col items-start pt-[28px] gap-[12px]">
        <div className="flex justify-center items-center px-[10px] py-[4px] gap-[10px] bg-[#020202] rounded-full">
          <span className="text-white text-[11px] font-normal leading-[150%] tracking-[-0.02em]">
            {experience.category}
          </span>
        </div>

        <div className="flex flex-col items-start gap-[12px] w-full">
          <div className="flex items-end gap-[8px]">
            <div className="w-[20px] h-[20px] bg-[#EAEBEF] rounded-full overflow-hidden relative">
            </div>
            <span className="text-[#000000] text-[14px] font-normal leading-[17px]">
              {experience.host.nickname}
            </span>
          </div>

          <h1 className="text-[#000000] text-[20px] font-semibold leading-[24px] w-full">
            {experience.title}
          </h1>
        </div>

        <div className="flex flex-row items-center flex-wrap gap-y-2 text-[#000000]">
          <div className="flex items-center gap-[4px]">
            <Clock className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.durationHours ? `${experience.durationHours} Hours` : '2 Hours'}
            </span>
          </div>
          
          <div className="w-[12px] h-[1px] bg-[#EAEBEF] rotate-90" />

          <div className="flex items-center gap-[4px]">
            <MapPin className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.host.area}
            </span>
          </div>

          <div className="w-[12px] h-[1px] bg-[#EAEBEF] rotate-90" />

          <div className="flex items-center gap-[4px]">
            <Users className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.minGuests} - {experience.maxGuests}
            </span>
          </div>

          <div className="w-[12px] h-[1px] bg-[#EAEBEF] rotate-90" />

          <div className="flex items-center gap-[4px]">
            <Languages className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.host.languages.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start pt-[28px] gap-[46px]">
        <div className="flex flex-col items-start gap-[12px] w-full">
          <h1 className="text-[#000000] text-[14px] font-normal leading-[100%] tracking-[0%] w-full">
            {experience.description}
          </h1>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EAEBEF] flex justify-between items-start px-5 pt-5 pb-8 z-50">
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold leading-[20px] text-black">
            {experience.price} / guest
          </span>
          <span className="text-[10px] font-normal leading-[16px] text-[#4B4B4B]">
            No charge until host accepts
          </span>
        </div>
        <button className="flex justify-center items-center w-[163.5px] h-[40px] px-[12px] py-[10px] bg-[#020202] rounded-lg gap-[10px]">
          <span className="text-white text-[14px] font-semibold leading-[16px]">
            Show Availability
          </span>
        </button>
      </div>
    </div>
  );
}
