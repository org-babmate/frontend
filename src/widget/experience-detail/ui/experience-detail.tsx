'use client';

import { useRouter } from 'next/navigation';
import { useExperienceDetailQuery } from '@/entities/experiences/model/queries';
import { ExperienceHeader } from './experience-header';
import { ExperienceInfo } from './experience-info';
import { ExperienceFooter } from './experience-footer';

interface ExperienceDetailProps {
  experienceId: string;
}

export function ExperienceDetailWidget({ experienceId }: ExperienceDetailProps) {
  const router = useRouter();
  const { data: experience, isLoading, isError } = useExperienceDetailQuery(experienceId);

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
      <ExperienceHeader title={experience.title} photos={experience.photos || []} />
      <ExperienceInfo experience={experience} />
      <ExperienceFooter price={experience.price} />
    </div>
  );
}
