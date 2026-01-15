'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import BookingFinal from '@/widget/booking-final';
import { ExperienceFooter } from './experience-footer';
import type { ReservationState } from '@/app/experience/[id]/page';
import { ExperienceDetail, ScheduleLists } from '@/entities/experiences/model/types';

type Props = {
  experience: ExperienceDetail;
  schedules: ScheduleLists[];
  step: 'detail' | 'final';
  setStep: Dispatch<SetStateAction<'detail' | 'final'>>;
};

export function GuestExperienceDetail({ experience, schedules, step, setStep }: Props) {
  const [count, setCount] = useState(0);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedReservation, setSelectedReservation] = useState<ReservationState>({
    scheduleId: '',
    experienceId: '',
    finalDate: '',
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handlers = useMemo(
    () => ({
      inc: () => setCount((c) => c + 1),
      dec: () => setCount((c) => (c > 0 ? c - 1 : 0)),
    }),
    [],
  );

  return step === 'detail' ? (
    <ExperienceFooter
      isSheetOpen={isSheetOpen}
      setIsSheetOpen={setIsSheetOpen}
      experience={experience}
      setSteps={setStep}
      handleIncrement={handlers.inc}
      handleDecrement={handlers.dec}
      schedules={schedules}
      count={count}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedReservation={selectedReservation}
      setSelectedReservation={setSelectedReservation}
    />
  ) : (
    <BookingFinal
      title={experience.title}
      description={experience.description}
      currency={experience.currency}
      image={experience.photos?.[0]}
      guestCount={count}
      finalDate={selectedReservation.finalDate}
      requestMemo=""
      setSteps={setStep}
      scheduleId={selectedReservation.scheduleId}
      price={experience.price}
    />
  );
}
