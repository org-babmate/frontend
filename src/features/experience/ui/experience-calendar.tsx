import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/ui/calendar';
import { RadioGroup } from '@/shared/ui/radio-group';
import { useState } from 'react';

type Mode = 'uniform' | 'individual';
type TimeMode = 'uniform' | 'individual';

const MODE_OPTIONS = [
  { label: '일관 선택', value: 'uniform' },
  { label: '개별 선택', value: 'individual' },
] as const;

const TIME_OPTIONS = [
  { label: '매일 같은 시간', value: 'uniform' },
  { label: '요일마다 다름', value: 'individual' },
] as const;

function ExperienceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mode, setMode] = useState<Mode>('uniform');
  const [timeMode, setTimeMode] = useState<TimeMode>('uniform');
  const [days, setDays] = useState<Weekday[]>([]);
  const [range, setRange] = useState<1 | 3 | 6>(1);
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
          <div className="flex flex-row justify-between mt-2">
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
          </div>
        </div>
      ) : (
        <Calendar
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
            placeholder="00:00"
            className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
          />
          <span className="self-center leading-none text-body-lg">~</span>
          {/* {시간 로직 필요} */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="00:00"
            className="ring ring-gray-100 py-3 px-4 rounded-xl text-body-lg min-w-0"
          />
        </div>
      </div>
    </div>
  );
}

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type WeeklyProps = {
  value: Weekday[];
  onChange: (next: Weekday[]) => void;
  disabled?: boolean;
  className?: string;
};
const DAYS: { label: string; value: Weekday }[] = [
  { label: 'Mo', value: 'Monday' },
  { label: 'Tu', value: 'Tuesday' },
  { label: 'We', value: 'Wednesday' },
  { label: 'Th', value: 'Thursday' },
  { label: 'Fr', value: 'Friday' },
  { label: 'Sa', value: 'Saturday' },
  { label: 'Su', value: 'Sunday' },
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
              active ? '  border-gray-100' : 'bg-white text-gray-600 hover:bg-gray-100',
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

export default ExperienceCalendar;
