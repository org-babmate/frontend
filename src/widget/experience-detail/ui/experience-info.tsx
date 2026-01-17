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
    <div className="bg-background-subtle flex w-full flex-col gap-2">
      <div className="flex flex-col items-center gap-3 bg-white px-3 py-5">
        <span className="text-label-1-semibold rounded-full bg-black p-2 text-white">
          {getCategoryLabel(experience.category)}
        </span>
        <h1 className="ty-heading-2 text-label">{experience.title}</h1>
        <p className="ty-label-1-regular text-label-subtle">{experience.description}</p>
        <Link
          href={`/hosts/profile/${experience.hostId}`}
          className="shadow-1 rounded-4 flex w-full flex-row gap-3 border border-gray-200 p-4"
        >
          <div className="relative size-16 shrink-0 rounded-full">
            <ImageWithFallback
              alt={'host profile Image'}
              src={experience.host?.profileImage}
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1 overflow-hidden">
            <span className="text-body-1-semibold text-label">{experience.host?.nickname}</span>
            <span className="text-label-1-regular text-label-subtle truncate text-start">
              {experience.host?.tagline}
            </span>
            <div className="relative">
              <div className="no-scrollbar mt-1 flex flex-row flex-nowrap gap-1 overflow-x-auto">
                {experience.host?.languages.map((value) => (
                  <span
                    key={value}
                    className="ty-label-2-medium text-label-subtle rounded-2 border border-gray-200 px-2 py-1 whitespace-nowrap"
                  >
                    {getLanguageLabel(value, true)}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-5 bg-white px-4 py-5">
        <div className="flex flex-row gap-3">
          <div className="bg-primary-subtle rounded-3 size-11 p-2">
            <Image src="/icons/symbol.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">Duration</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.durationHours} Hours`}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row gap-3">
          <div className="bg-primary-subtle rounded-3 size-11 p-2">
            <Image src="/icons/avatar.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">Number of Guests</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.minGuests} - ${experience.maxGuests}`}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row gap-3">
          <div className="bg-primary-subtle rounded-3 size-11 p-2">
            <Image src="/icons/location.svg" alt="icons" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-2-semibold text-label">Where to meet</span>
            <span className="text-body-2-medium text-label-subtle">{`${experience.meetingArea}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
