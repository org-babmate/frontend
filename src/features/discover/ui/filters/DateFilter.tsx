'use client';

import { Calendar } from '@/shared/ui/calendar';
import { DateRange } from 'react-day-picker';

import { addDays, endOfWeek, nextSaturday, startOfToday } from 'date-fns';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';

interface DateFilterProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

export function DateFilter({ selected, onSelect }: DateFilterProps) {
  const handleToday = () => {
    const today = startOfToday();
    onSelect({ from: today, to: today });
  };

  const handleTomorrow = () => {
    const tomorrow = addDays(startOfToday(), 1);
    onSelect({ from: tomorrow, to: tomorrow });
  };

  const handleThisWeekend = () => {
    const today = startOfToday();
    const saturday = nextSaturday(today);
    const sunday = addDays(saturday, 1);
    onSelect({ from: saturday, to: sunday });
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center h-fit">
      <h3 className="text-[16px] font-semibold self-start">Date</h3>
      <CustomCalendar
        className="w-82 bg-white rounded-5"
        mode="range"
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
}
