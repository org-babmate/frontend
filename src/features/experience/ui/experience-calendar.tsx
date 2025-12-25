import { Schedules } from '@/entities/experiences/model/types';
import { cn } from '@/shared/lib/utils';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import ModalDim from '@/shared/ui/modal-dim';
import { RadioGroup } from '@/shared/ui/radio-group';
import { TimeDropdown } from '@/shared/ui/time-dropdown';
import { Weekday } from '@/widget/experience-step';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  onScheduleChange: (list: { date: string; startTime: string; endTime: string }[]) => void;
}

const MODE_OPTIONS = [
  { label: '1시간', value: 1 },
  { label: '2시간', value: 2 },
  { label: '3시간', value: 3 },
  { label: '4시간', value: 4 },
  { label: '5시간', value: 5 },
  { label: '6시간', value: 6 },
];

interface ScheduleList {
  date: Date;
  ScheduleList: TimeLine[];
}

interface TimeLine {
  startTime: string;
  endTime: string;
}

function ExperienceCalendar({ onScheduleChange }: Props) {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const defaultDateRange: DateRange = {
    from: tomorrow,
    to: tomorrow,
  };
  const defaultTime = '00:00';

  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);

  const [modalCalendar, setModalCalendar] = useState(false);

  const [scheduleList, setScheduleList] = useState<ScheduleList[]>([]);

  const TIME_OPTIONS = generateTimeOptions(MODE_OPTIONS[0].value * 60);

  const [startTime, setStartTime] = useState<string>(defaultTime);
  const [durationHours, setDurationHours] = useState<number>(MODE_OPTIONS[0].value);
  const [endTime, setEndTime] = useState<string>(defaultTime);

  useEffect(() => {
    const computed = addHoursToTime(startTime, durationHours);
    if (!computed) {
      // 자정 넘기는 경우를 허용하지 않으면: 시작시간을 되돌리거나, 에러 상태 처리
      // 여기서는 endTime을 비우고 UI에서 안내하는 방식 권장
      setEndTime('');
      return;
    }
    setEndTime(computed);
  }, [startTime, durationHours]);

  useEffect(() => {
    onScheduleChange(flattenSchedules(scheduleList));
  }, [scheduleList, onScheduleChange]);

  const handleScheduleAdd = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    if (!startTime || !endTime) return;

    const schedules = generateScheduleList(dateRange, { startTime, endTime }, durationHours);

    setScheduleList((prev) => {
      const mergedResult = mergeSchedulesByDate(prev, schedules);

      if (!mergedResult.ok) {
        alert(mergedResult.message); // 또는 toast/error state
        return prev; // 추가 중단
      }

      return mergedResult.merged; // 정렬된 결과 반영
    });

    // 초기화/모달 닫기
    setDateRange(defaultDateRange);
    setStartTime(defaultTime);
    setEndTime(defaultTime);
    setModalCalendar(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-headline-lg text-gray-600 mb-6">소유시간을 설정해 주세요</h1>
      <div className="grid grid-cols-3 gap-3">
        {MODE_OPTIONS.map((value, index) => {
          return (
            <button
              key={index}
              className={cn(
                'flex-1 ring ring-gray-100 text-button-md rounded-xl py-5 bg-purewhite text-black',
                durationHours === value.value && 'bg-black text-white',
              )}
              onClick={() => setDurationHours(value.value)}
            >
              {value.label}
            </button>
          );
        })}
      </div>
      <hr />
      <h1 className="text-headline-lg text-gray-600 mb-6">일정을 등록해주세요</h1>
      <div className="flex flex-col gap-5 mb-7">
        {scheduleList.map((value, index) => {
          return (
            <div key={index} className="flex flex-col gap-3">
              <span>{formatKoreanDate(value.date)}</span>
              <div className="flex flex-wrap flex-row gap-1">
                {value.ScheduleList.map((value, index) => (
                  <div
                    key={index}
                    className="py-2.5 px-3 text-gray-400 bg-gray-50 rounded-lg"
                  >{`${value.startTime} - ${value.endTime}`}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-button-md w-full text-center py-2.5 bg-black text-purewhite rounded-lg"
        onClick={() => setModalCalendar(true)}
      >
        날짜 추가
      </button>
      {modalCalendar && (
        <ModalDim>
          <div className="flex flex-col gap-3 bg-white px-8 py-8 relative rounded-xl">
            <div className="absolute top-3 right-2" onClick={() => setModalCalendar(false)}>
              <X />
            </div>
            <CustomCalendar
              mode="range"
              disabled={(date) => date < today}
              selected={dateRange}
              onSelect={setDateRange}
              buttonVariant="ghost"
              classNames={{
                month_caption: 'flex items-center justify-between h-(--cell-size) w-full px-2',
              }}
            />
            <div className="grid grid-cols-2 gap-3">
              <TimeDropdown value={startTime} onChange={setStartTime} options={TIME_OPTIONS} />
              <TimeDropdown value={endTime} onChange={setEndTime} options={TIME_OPTIONS} />
            </div>
            <button
              onClick={handleScheduleAdd}
              className="bg-black rounded-xl py-2.5 text-button-md text-purewhite w-full"
            >
              등록하기
            </button>
          </div>
        </ModalDim>
      )}
    </div>
  );
}

export type TimeOption = { label: string; value: string }; // "HH:mm"

export function generateTimeOptions(intervalMinutes = 30): TimeOption[] {
  const options: TimeOption[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const t = `${hh}:${mm}`;
      options.push({ label: t, value: t });
    }
  }
  return options;
}

export function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

//시간별
export function addHoursToTime(start: string, hours: number) {
  const startMin = timeToMinutes(start);
  const endMin = startMin + hours * 60;
  if (endMin > 24 * 60) return null; // 자정 넘김(원치 않으면 차단)
  return minutesToTime(endMin);
}

//소유시간 마다 시간별 추가
export function splitByHour(range: TimeLine, duration: number): TimeLine[] {
  const startMin = timeToMinutes(range.startTime);
  const endMin = timeToMinutes(range.endTime);

  if (endMin <= startMin || duration <= 0) return [];

  const result: TimeLine[] = [];
  const step = duration * 60;

  for (let current = startMin; current + step <= endMin; current += step) {
    result.push({
      startTime: minutesToTime(current),
      endTime: minutesToTime(current + step),
    });
  }

  return result;
}

//날짜마다 시간 추가
function generateScheduleList(
  dateRange: DateRange,
  timeRange: TimeLine,
  duration: number,
): ScheduleList[] {
  if (!dateRange.from || !dateRange.to) return [];

  const result: ScheduleList[] = [];

  const current = new Date(dateRange.from);
  current.setHours(0, 0, 0, 0);

  const end = new Date(dateRange.to);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    result.push({
      date: new Date(current),
      ScheduleList: splitByHour(timeRange, duration),
    });

    current.setDate(current.getDate() + 1);
  }

  return result;
}
export default ExperienceCalendar;

//한글 날짜 변환
function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();

  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const weekday = weekdays[date.getDay()];

  return `${month}월 ${day}일 ${weekday}`;
}

function flattenSchedules(
  input: {
    date: Date;
    ScheduleList: { startTime: string; endTime: string }[];
  }[],
): Schedules[] {
  return input.flatMap((day) =>
    day.ScheduleList.map((slot) => ({
      date: day.date.toISOString().split('T')[0], // "YYYY-MM-DD"
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  );
}

function compareTime(a: string, b: string) {
  return timeToMinutes(a) - timeToMinutes(b);
}

function compareDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

function isOverlap(a: TimeLine, b: TimeLine) {
  // 동일 시간도 겹침으로 처리: [aStart, aEnd) 와 [bStart, bEnd)
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);

  // aEnd == bStart 는 겹치지 않음(연속은 OK). 동일/교차는 겹침.
  return aStart < bEnd && bStart < aEnd;
}

function sortAndValidateDaySlots(slots: TimeLine[]) {
  const sorted = [...slots].sort((x, y) => compareTime(x.startTime, y.startTime));

  for (let i = 0; i < sorted.length - 1; i++) {
    const cur = sorted[i];
    const next = sorted[i + 1];

    if (isOverlap(cur, next)) {
      return { ok: false as const, sorted, conflict: { cur, next } };
    }
  }

  return { ok: true as const, sorted };
}

function mergeSchedulesByDate(
  prev: ScheduleList[],
  next: ScheduleList[],
): { ok: true; merged: ScheduleList[] } | { ok: false; message: string } {
  // date key를 yyyy-mm-dd 로 통일
  const keyOf = (d: Date) => d.toISOString().split('T')[0];

  const map = new Map<string, { date: Date; slots: TimeLine[] }>();

  const put = (item: ScheduleList) => {
    const key = keyOf(item.date);
    const existing = map.get(key);

    if (!existing) {
      map.set(key, { date: item.date, slots: [...item.ScheduleList] });
    } else {
      existing.slots.push(...item.ScheduleList);
    }
  };

  prev.forEach(put);
  next.forEach(put);

  // 날짜별로 정렬 + 겹침 검사
  const merged: ScheduleList[] = [];

  for (const [key, { date, slots }] of map.entries()) {
    const checked = sortAndValidateDaySlots(slots);
    if (!checked.ok) {
      const { cur, next } = checked.conflict;
      return {
        ok: false,
        message: `Overlapping time slots on ${key}: ${cur.startTime}-${cur.endTime} overlaps ${next.startTime}-${next.endTime}.`,
      };
    }

    merged.push({
      date,
      ScheduleList: checked.sorted,
    });
  }

  // 날짜 오름차순 정렬
  merged.sort((a, b) => compareDate(a.date, b.date));

  return { ok: true, merged };
}
