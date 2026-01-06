'use client';

import { Clock, MapPin, Users, Languages } from 'lucide-react';
import { ExperienceDetail } from '@/entities/experiences/model/types';

interface ExperienceInfoProps {
  experience: ExperienceDetail;
}

export function ExperienceInfo({ experience }: ExperienceInfoProps) {
  return (
    <div className=" bg-white w-full px-5">
      <div className="flex flex-col items-start pt-7 gap-3 ">
        <div className="flex justify-center items-center px-2.5 py-1 gap-2.5  rounded-full">
          <span className="text-white text-[11px] font-normal leading-[150%] tracking-[-0.02em]">
            {experience.category}
          </span>
        </div>
        <div className="flex flex-col items-start gap-[12px] w-full">
          <div className="flex items-end gap-2">
            <div className="size-5  rounded-full overflow-hidden relative"></div>
            <span className="">{experience.host?.nickname}</span>
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

          <div className="w-[12px] h-[1px] rotate-90" />

          <div className="flex items-center gap-[4px]">
            <MapPin className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.meetingPlace}
            </span>
          </div>

          <div className="w-[12px] h-[1px]  rotate-90" />

          <div className="flex items-center gap-[4px]">
            <Users className="w-[16px] h-[16px]" />
            <span className="text-[12px] font-normal leading-[14px]">
              {experience.minGuests} - {experience.maxGuests}
            </span>
          </div>

          <div className="w-[12px] h-[1px]  rotate-90" />

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
    </div>
  );
}
