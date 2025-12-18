import { Schedules } from '@/entities/experiences/model/types';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import { RadioGroup } from '@/shared/ui/radio-group';
import { Mode, TimeMode, Weekday } from '@/widget/experience-step';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  onScheduleChange: (list: { date: string; startTime: string; endTime: string }[]) => void;
}

const MODE_OPTIONS = [
  { label: '일관 선택', value: 'uniform' },
  { label: '개별 선택', value: 'individual' },
] as const;

const TIME_OPTIONS = [
  { label: '매일 같은 시간', value: 'uniform' },
  { label: '요일마다 다름', value: 'individual' },
] as const;

function ExperienceCalendar({ onScheduleChange }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mode, setMode] = useState<Mode>('uniform');
  const [timeMode, setTimeMode] = useState<TimeMode>('uniform');
  const [days, setDays] = useState<Weekday[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const scheduleList = buildScheduleByDAYS(days, startTime, endTime);
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);

    let hh = digits.slice(0, 2);
    let mm = digits.slice(2, 4);

    if (hh.length === 2 && Number(hh) > 23) {
      hh = '23';
    }

    if (mm.length === 2 && Number(mm) > 59) {
      mm = '59';
    }

    let formatted = hh;
    if (mm.length > 0) {
      formatted = `${hh}:${mm}`;
    }

    setStartTime(formatted);
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);

    let hh = digits.slice(0, 2);
    let mm = digits.slice(2, 4);

    if (hh.length === 2 && Number(hh) > 23) {
      hh = '23';
    }

    if (mm.length === 2 && Number(mm) > 59) {
      mm = '59';
    }

    let formatted = hh;
    if (mm.length > 0) {
      formatted = `${hh}:${mm}`;
    }
    setEndTime(formatted);
  };

  useEffect(() => {
    onScheduleChange(scheduleList);
  }, [scheduleList, onScheduleChange]);
  return (
    <div>
      <h1 className="text-headline-lg text-gray-600 mb-6">일정을 설정해 주세요</h1>
      <RadioGroup name={'mode-radio'} value={mode} onChange={setMode} options={MODE_OPTIONS} />
      {mode === 'uniform' ? (
        <div className="mt-6">
          <h3 className="text-body-xl text-gray-600">요일 선택</h3>
          <div className="flex flex-row gap-1 mt-2">
            <WeekdayButtons value={days} onChange={setDays} />
          </div>
          <h3 className="text-body-xl text-gray-600 mt-4">적용기간</h3>
          {/* <div className="flex flex-row justify-between mt-2">
            <button
              onClick={() => setRange(1)}
              className={cn(
                'w-[107px] rounded-xl py-3 border border-gray-100',
                range == 1 && ' border-gray-600',
              )}
            >
              1개월 동안
            </button>
            <button
              onClick={() => setRange(3)}
              className={cn(
                'w-[107px] rounded-xl py-3 border border-gray-100',
                range == 3 && 'border border-gray-600',
              )}
            >
              3개월 동안
            </button>
            <button
              onClick={() => setRange(6)}
              className={cn(
                'w-[107px] rounded-xl py-3 border border-gray-100',
                range == 6 && 'border border-gray-600',
              )}
            >
              6개월 동안
            </button>
          </div> */}
        </div>
      ) : (
        <CustomCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          classNames={{
            month_caption: 'flex items-center justify-between h-(--cell-size) w-full px-2',
          }}
          disabled={(date) => date < new Date()}
        />
      )}
      <hr className="my-10" />
      <div>
        <h1 className="text-headline-lg text-gray-600 mb-6">시간을 설정해 주세요</h1>
        <RadioGroup
          name={'time-radio'}
          value={timeMode}
          onChange={setTimeMode}
          options={TIME_OPTIONS}
        />
        <h3 className="text-body-xl text-gray-600 mt-4">적용기간</h3>
        <div className="flex flex-row w-full gap-3 items-center mt-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={startTime}
            onChange={handleStartChange}
            placeholder="00:00"
            className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
          />
          <span className="self-center leading-none text-body-lg">~</span>
          {/* {시간 로직 필요} */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={endTime}
            onChange={handleEndChange}
            placeholder="00:00"
            className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
          />
        </div>
      </div>
    </div>
  );
}

type WeeklyProps = {
  value: Weekday[];
  onChange: (next: Weekday[]) => void;
  disabled?: boolean;
  className?: string;
};
const DAYS: { label: string; value: Weekday; number: number }[] = [
  { label: 'Mo', value: 'Monday', number: 1 },
  { label: 'Tu', value: 'Tuesday', number: 2 },
  { label: 'We', value: 'Wednesday', number: 3 },
  { label: 'Th', value: 'Thursday', number: 4 },
  { label: 'Fr', value: 'Friday', number: 5 },
  { label: 'Sa', value: 'Saturday', number: 6 },
  { label: 'Su', value: 'Sunday', number: 0 },
];

function WeekdayButtons({ value, onChange, disabled = false, className = '' }: WeeklyProps) {
  const toggle = (day: Weekday) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };
  return (
    <div className={`flex gap-1 w-full justify-between  ${className}`}>
      {DAYS.map(({ label, value: day }) => {
        const active = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            disabled={disabled}
            aria-pressed={active}
            onClick={() => toggle(day)}
            className={[
              'rounded-md text-sm font-medium transition flex-1 py-4',
              'border border-gray-300',
              active
                ? '  border-gray-100 bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
              disabled && 'opacity-50 cursor-not-allowed',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

const DAY_MAP = {
  su: 0,
  mo: 1,
  tu: 2,
  we: 3,
  th: 4,
  fr: 5,
  sa: 6,
} as const;

function isHHmm(v: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
}

function toLocalDateString(d: Date) {
  // 로컬 기준 YYYY-MM-DD
  return d.toLocaleDateString('sv-SE');
}

function buildScheduleByDAYS(
  selectedDays: Weekday[],
  startTime: string,
  endTime: string,
  months = 1,
  startDate: Date = new Date(),
): Schedules[] {
  if (!selectedDays.length) return [];
  if (!isHHmm(startTime) || !isHHmm(endTime)) return [];
  if (startTime >= endTime) return [];

  const dayNumberMap = new Map<Weekday, number>(DAYS.map((d) => [d.value, d.number]));

  const targetNumbers = new Set(selectedDays.map((d) => dayNumberMap.get(d)!));

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setMonth(end.getMonth() + months);

  const result: Schedules[] = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    if (targetNumbers.has(cursor.getDay())) {
      result.push({
        date: toLocalDateString(cursor),
        startTime,
        endTime,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

export default ExperienceCalendar;
