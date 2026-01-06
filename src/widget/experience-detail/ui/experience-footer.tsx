'use client';

import { ReservationState } from '@/app/experience/[id]/page';
import { ExperienceDetail, ScheduleLists } from '@/entities/experiences/model/types';
import { useUserStore } from '@/processes/profile-session/use-profile-store';
import { cn, dateKeyToKstDate, getDateInfo, toKstDateKey } from '@/shared/lib/utils';
import { SharedBottomSheet } from '@/shared/ui/bottom-sheet';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface ExperienceFooterProps {
  isSheetOpen: boolean;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
  experience: ExperienceDetail;
  schedules: ScheduleLists[];
  handleIncrement: () => void;
  handleDecrement: () => void;
  count: number;
  setSteps: Dispatch<SetStateAction<'detail' | 'final'>>;
  selectedReservation: ReservationState;
  setSelectedReservation: Dispatch<SetStateAction<ReservationState>>;
}

export function ExperienceFooter({
  isSheetOpen,
  setIsSheetOpen,
  schedules,
  experience,
  handleIncrement,
  handleDecrement,
  count,
  setSteps,
  selectedReservation,
  setSelectedReservation,
}: ExperienceFooterProps) {
  const router = useRouter();
  const { name, mode } = useUserStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const isSignedIn = name !== '';
  const isGuestMode = mode === 'users';

  const isSelectDisabled = selectedReservation.scheduleId === '' || count === 0 || !isGuestMode;

  const footerButtonText = !isSignedIn
    ? 'Need to Sign In'
    : !isGuestMode
      ? 'Need to switch to Guest Mode'
      : 'Request to book';

  const handleBooking = async () => {
    if (name === '') {
      await alert('need to login');
      router.push('/login');
    }
    setSteps('final');
  };

  const enabledDateSet = useMemo(() => {
    return new Set(schedules.map((s) => s.date));
  }, [schedules]);

  const visibleSchedules = useMemo(() => {
    if (!selectedDate) return schedules;
    return schedules.filter((d) => d.date === selectedDate);
  }, [schedules, selectedDate]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EAEBEF] flex justify-between items-start px-5 pt-5 pb-8 z-50">
      <div className="flex flex-col gap-1">
        <span className="text-[17px] font-semibold leading-5 text-black">
          {experience.price} / guest
        </span>
        <span className="text-[10px] font-normal leading-4 text-[#4B4B4B]">
          No charge until host accepts
        </span>
      </div>
      <SharedBottomSheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
        }}
        title="Reservation"
        footerButtonText={footerButtonText}
        footerButtonTextClassName=""
        onApply={handleBooking}
        isSelectDisabled={isSelectDisabled}
        trigger={
          <button className="flex justify-center items-center w-[163.5px] h-10 px-3 py-2.5 bg-gray-600 rounded-lg gap-2.5">
            <span className="text-white text-[14px] font-semibold leading-4">
              Show Availability
            </span>
          </button>
        }
      >
        <div>
          <h3 className="text-body-lg mb-4">Guests</h3>
          <div className="flex flex-row items-center mb-6">
            <button
              onClick={handleDecrement}
              disabled={count === 0}
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ${
                count === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="mx-3 text-[16px] font-medium min-w-[20px] text-center">{count}</span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <h3 className="text-body-lg mb-3">Date</h3>
          <CustomCalendar
            mode="single"
            selected={selectedDate ? dateKeyToKstDate(selectedDate) : undefined}
            onSelect={(d) => {
              if (!d) {
                setSelectedDate(null);
                return;
              }
              const key = toKstDateKey(d);
              if (!enabledDateSet.has(key)) return; // 혹시 모를 방어
              setSelectedDate(key); // ✅ "2025-01-01" 형태로 저장
            }}
            disabled={(date) => !enabledDateSet.has(toKstDateKey(date))}
          />
          <div className="flex flex-col gap-3">
            {/* {schedules.map((dateValue) => {
              const { year, weekdayEngLong, monthEngLong, day } = getDateInfo(dateValue.date);

              return dateValue.slots.map((timeValue) => {
                const dateText = `${weekdayEngLong} ${day} ${monthEngLong} ${year}  / ${timeValue.startTime} - ${timeValue.endTime}`;
                return (
                  <button
                    onClick={() =>
                      setSelectedReservation({
                        experienceId: experience.id ?? '',
                        scheduleId: timeValue.id ?? '',
                        finalDate: dateText,
                      })
                    }
                    className={cn(
                      'text-body-xl text-gray-500 bg-purewhite border border-gray-400 text-center rounded-xl py-3.5',
                      selectedReservation.scheduleId == timeValue.id && ' bg-gray-50 border-black',
                    )}
                    key={timeValue.id}
                  >
                    {dateText}
                  </button>
                );
              });
            })} */}
            {visibleSchedules.flatMap((dateValue) => {
              const { year, weekdayEngLong, monthEngLong, day } = getDateInfo(dateValue.date);

              const datePrefix = `${weekdayEngLong} ${day} ${monthEngLong} ${year}`;

              return dateValue.slots.map((timeValue, timeIndex) => {
                const dateText = `${datePrefix} / ${timeValue.startTime} - ${timeValue.endTime}`;

                return (
                  <button
                    key={`${dateValue.date}-${timeValue.id ?? timeIndex}`}
                    onClick={() =>
                      setSelectedReservation({
                        experienceId: experience.id ?? '',
                        scheduleId: timeValue.id ?? '',
                        finalDate: dateText,
                      })
                    }
                    className={cn(
                      'text-body-xl text-gray-500 bg-white border border-gray-400 text-center rounded-xl py-3.5',
                      selectedReservation.scheduleId === timeValue.id && 'bg-gray-50 border-black',
                    )}
                  >
                    {dateText}
                  </button>
                );
              });
            })}
          </div>
        </div>
      </SharedBottomSheet>
    </div>
  );
}
