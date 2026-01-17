'use client';

import { ExperienceDetail } from '@/entities/experiences/model/types';
import { getCategoryLabel } from '@/shared/data/categories';
import { getLanguageLabel } from '@/shared/data/languageList';
import { ImageWithFallback } from '@/shared/ui/image-with-fallback';
import Image from 'next/image';
import Link from 'next/link';

interface ExperienceInfoProps {
  experience: ExperienceDetail;
}

export function ExperienceInfo({ experience }: ExperienceInfoProps) {
  return (
    <div className="bg-background-subtle w-full flex flex-col gap-2">
      <div className="flex flex-col items-center gap-3 px-3 py-5 bg-white">
        <span className="text-white bg-black p-2 rounded-full text-label-1-semibold">
          {getCategoryLabel(experience.category)}
        </span>
        <h1 className="ty-heading-2 text-label">{experience.title}</h1>
        <p className="ty-label-1-regular text-label-subtle">{experience.description}</p>
        <Link
          href={`/hosts/profile/${experience.hostId}`}
          className="flex flex-row p-4 gap-3 border border-gray-200 shadow-1 rounded-4 w-full"
        >
          <div className="relative size-16 rounded-full shrink-0">
            <ImageWithFallback
              alt={'host profile Image'}
              src={experience.host?.profileImage}
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1 overflow-hidden">
            <span className="text-body-1-semibold text-label">{experience.host?.nickname}</span>
            <span className="text-label-1-regular text-label-subtle text-start truncate">
              {experience.host?.tagline}
            </span>
            <div className="relative">
              <div className="flex flex-row flex-nowrap mt-1 gap-1 overflow-x-auto no-scrollbar ">
                {experience.host?.languages.map((value) => (
                  <span
                    key={value}
                    className="ty-label-2-medium text-label-subtle border border-gray-200 py-1 px-2 rounded-2 whitespace-nowrap"
                  >
                    {getLanguageLabel(value, false)}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col px-4 py-5 bg-white gap-5">
        <div className="flex flex-row gap-3">
          <div className="size-11 bg-primary-subtle p-2 rounded-3">
            <Image src="/icons/symbol.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">소요시간</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.durationHours} Hours`}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row gap-3">
          <div className="size-11 bg-primary-subtle p-2 rounded-3">
            <Image src="/icons/avatar.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">모집 인원</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.minGuests}명 - ${experience.maxGuests}명`}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row gap-3">
          <div className="size-11 bg-primary-subtle p-2 rounded-3">
            <Image src="/icons/location.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">장소</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.meetingArea}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
