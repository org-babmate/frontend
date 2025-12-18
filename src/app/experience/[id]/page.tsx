'use client';

import { useParams, useRouter } from 'next/navigation';
import { useExperienceDetailQuery } from '@/entities/experiences/model/queries';
import { ImageCarousel } from '@/shared/ui/carousel';
import {
  ChevronLeft,
  Clock,
  MapPin,
  Users,
  Languages,
  Share,
  Heart,
  SlidersHorizontal,
  Minus,
  Plus,
} from 'lucide-react';
import { SharedBottomSheet } from '@/shared/ui/bottom-sheet';
import { SetStateAction, useState } from 'react';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import { useReservationStore } from '@/processes/reservation-session/use-reservation-store';
import { cn } from '@/shared/lib/utils';
import BookingDetail from '@/widget/booking-detail';
import BookingFinal from '@/widget/booking-final';

export interface ReservationState {
  scheduleId: string;
  experienceId: string;
  finalDate: string;
}

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState<'detail' | 'final'>('detail');
  const [selectedReservation, setSelectedReservation] = useState<ReservationState>({
    scheduleId: '',
    experienceId: '',
    finalDate: '',
  });

  const { data, isLoading, isError } = useExperienceDetailQuery(id);

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

  function getDateInfo(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const weekdayKor = date.toLocaleDateString('ko-KR', { weekday: 'long' });
    const monthKor = date.toLocaleDateString('ko-KR', { month: 'long' });
    const weekdayEng = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthEng = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    return { year: y, weekdayKor, weekdayEng, monthEng, monthKor, day };
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
    <>
      {steps === 'detail' && (
        <BookingDetail
          experience={experience}
          setSteps={setSteps}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          schedules={schedules}
          count={count}
          getDateInfo={getDateInfo}
          selectedReservation={selectedReservation}
          setSelectedReservation={setSelectedReservation}
        />
      )}
      {steps === 'final' && (
        <BookingFinal
          image={experience.photos[0]}
          guestCount={count}
          finalDate={selectedReservation.finalDate}
          requestMemo={''}
          setSteps={setSteps}
          questCount={count}
          scheduleId={selectedReservation.scheduleId}
        />
      )}
    </>
  );
}
