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
    <div className="min-h-screen bg-white pb-24">
      <div className="relative w-full bg-[#EAEBEF]">
        <button
          onClick={() => router.back()}
          className="absolute top-[31px] w-[24px] h-[24px] z-20 text-[#020202] drop-shadow-md flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft className="w-full h-full" strokeWidth={3} />
        </button>

        {/* TODO: Revert to real data after testing */ }
        <ImageCarousel
          // images={experience.photos || []}
          images={['/a.jpg', '/a.jpg', '/a.jpg', '/a.jpg']}
          height="367px"
          title={experience.title}
        />
      </div>
    </div>
  );
}
