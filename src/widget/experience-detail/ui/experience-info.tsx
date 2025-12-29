'use client';

import { Clock, MapPin, Users, Languages } from 'lucide-react';
import { ExperienceDetail } from '@/entities/experiences/model/types';

interface ExperienceInfoProps {
  experience: ExperienceDetail;
}

export function ExperienceInfo({ experience }: ExperienceInfoProps) {
  return (
    <>
      <div className="flex flex-col items-start pt-[28px] gap-[12px]">
        <div className="flex justify-center items-center px-[10px] py-[4px] gap-[10px] bg-[#020202] rounded-full">
          <span className="text-white text-[11px] font-normal leading-[150%] tracking-[-0.02em]">
            {experience.category}
          </span>
        </div>

        <div className="flex flex-col items-start gap-[12px] w-full">
          <div className="flex items-end gap-[8px]">
            <div className="w-[20px] h-[20px] bg-[#EAEBEF] rounded-full overflow-hidden relative"></div>
            <span className="text-[#000000] text-[14px] font-normal leading-[17px]">
              {experience.host?.nickname}
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
              {experience.meetingPlace}
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

          <div className="flex items-center gap-1">
            <Languages className="w-4 h-4" />
            <span className="text-[12px] font-normal leading-3.5">
              {experience.host?.languages.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start pt-7 gap-[46px]">
        <div className="flex flex-col items-start gap-3 w-full">
          <h1 className="text-[#000000] text-[14px] font-normal leading-[100%] tracking-[0%] w-full">
            {experience.description}
          </h1>
        </div>
      </div>
    </>
  );
}
