'use client';

import { useParams, useRouter } from 'next/navigation';
import { useExperienceDetailQuery } from '@/entities/experiences/model/queries';
import { ExperienceHeader } from './experience-header';
import { ExperienceInfo } from './experience-info';
import { ExperienceFooter } from './experience-footer';
import { useState } from 'react';
import { ReservationState } from '@/app/experience/[id]/page';
import BookingFinal from '@/widget/booking-final';

interface ExperienceDetailProps {
  experienceId: string;
}

export function ExperienceDetailWidget({ experienceId }: ExperienceDetailProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useExperienceDetailQuery(experienceId);

  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState<'detail' | 'final'>('detail');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationState>({
    scheduleId: '',
    experienceId: '',
    finalDate: '',
  });

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const { experienceDetail: experience, schedules } = data;

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

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
      {steps === 'detail' && (
        <>
          <ExperienceHeader title={experience.title} photos={experience.photos || []} />
          <ExperienceInfo experience={experience} />
          <ExperienceFooter
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            price={experience.price}
            experience={experience}
            setSteps={setSteps}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            schedules={schedules}
            count={count}
            selectedReservation={selectedReservation}
            setSelectedReservation={setSelectedReservation}
          />
        </>
      )}
      {steps === 'final' && (
        <BookingFinal
          title={experience.title}
          description={experience.description}
          currency={experience.currency}
          image={experience.photos[0]}
          guestCount={count}
          finalDate={selectedReservation.finalDate}
          requestMemo={''}
          setSteps={setSteps}
          questCount={count}
          scheduleId={selectedReservation.scheduleId}
          price={experience.price}
        />
      )}
    </div>
  );
}
