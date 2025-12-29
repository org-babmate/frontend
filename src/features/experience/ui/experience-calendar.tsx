'use client';

import { ScheduleLists, TimeLine } from '@/entities/experiences/model/types';
import { cn, dateKeyToKstDate, toKstDateKey } from '@/shared/lib/utils';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import ModalDim from '@/shared/ui/modal-dim';
import { TimeDropdown } from '@/shared/ui/time-dropdown';
import { MODE_OPTIONS } from '@/widget/experience-step';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

interface Props {
  finalScheduleList: ScheduleLists[];
  setFinalScheduleList: Dispatch<SetStateAction<ScheduleLists[]>>;
  durationHours: number;
  setDurationHours: Dispatch<SetStateAction<number>>;
  defaultDateRange: DateRange;
  tomorrow: Date;
}

export type TimeOption = { label: string; value: string };

function ExperienceCalendar({
  finalScheduleList,
  setFinalScheduleList,
  durationHours,
  setDurationHours,
  defaultDateRange,
  tomorrow,
  // onScheduleChange,
}: Props) {
  const defaultTime = '00:00';

  const TIME_OPTIONS = useMemo(() => generateTimeOptions(30), []);

  const START_TIME_OPTIONS = useMemo(() => {
    return TIME_OPTIONS.filter((opt) => addHoursToTime(opt.value, durationHours) !== null);
  }, [TIME_OPTIONS, durationHours]);

  const [modalCalendar, setModalCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);

  const [startTime, setStartTime] = useState<string>(defaultTime);
  const [endTime, setEndTime] = useState<string>(
    addHoursToTime(startTime, durationHours) ?? defaultTime,
  );

  const [changeConfirmModal, setChangeConfirmModal] = useState(false);
  const [tempDuration, setTempDuration] = useState(0);

  const computedEndTime = useMemo(() => {
    if (!startTime) return '';
    return addHoursToTime(startTime, durationHours) ?? '';
  }, [startTime, durationHours]);

  //TODO: I might dont need this line
  const [scheduleList, setScheduleList] = useState<ScheduleLists[]>([]);

  const [editModal, setEditModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [draft, setDraft] = useState<ScheduleLists | null>(null);

  useEffect(() => {
    setFinalScheduleList(scheduleList);
  }, [scheduleList, setFinalScheduleList]);

  const handleScheduleAdd = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    if (!startTime || !computedEndTime) return;

    const schedules = generateScheduleList(
      dateRange,
      { startTime, endTime: endTime },
      durationHours,
    );

    setScheduleList((prev) => {
      const mergedResult = mergeSchedulesByDate(prev, schedules);
      if (!mergedResult.ok) {
        alert(mergedResult.message);
        return prev;
      }
      return mergedResult.merged;
    });

    setDateRange(defaultDateRange);
    setStartTime(defaultTime);
    setModalCalendar(false);
  };

  const handleEdit = (index: number) => {
    setSelectedTime(index);
    setDraft(structuredClone(scheduleList[index]));
    setEditModal(true);
  };

  const closeEdit = () => {
    setEditModal(false);
    setDraft(null);
  };

  const updateDraftStartTime = (timeIndex: number, newStart: string) => {
    const nextEnd = addHoursToTime(newStart, durationHours);

    if (nextEnd === null) {
      alert('duration past midnight');
      return;
    }

    setDraft((prev) => {
      if (!prev) return prev;

      const next = structuredClone(prev);
      next.slots[timeIndex] = {
        ...next.slots[timeIndex],
        startTime: newStart,
        endTime: nextEnd,
      };
      return next;
    });
  };

  const applyDraft = () => {
    if (!draft) return;

    const checked = sortAndValidateDaySlots(draft.slots);

    if (!checked.ok) {
      const { cur, next } = checked.conflict;
      toast.info(
        `Overlapping time slots on: ${cur.startTime}-${cur.endTime} overlaps ${next.startTime}-${next.endTime}.`,
      );
      return;
    }

    setScheduleList((prev) => {
      const next = prev.slice();
      if (draft.slots.length > 0) {
        next[selectedTime] = draft;
      } else {
        next.splice(selectedTime, 1);
      }
      return next;
    });

    closeEdit();
  };

  function EditModal() {
    if (!draft) return null;

    return (
      <div className="bg-white flex flex-col gap-3 px-4 py-5 relative">
        <div className="absolute top-3 right-2" onClick={() => setEditModal(false)}>
          <X />
        </div>
        <span>{formatKoreanDate(draft.date)}</span>
        <div className="flex flex-col gap-2 ring ring-gray-50 p-3">
          {draft.slots.length <= 0 ? (
            <div>Empty Time Line</div>
          ) : (
            draft.slots.map((value, index) => (
              <div className="flex flex-row gap-4 items-center" key={index}>
                <TimeDropdown
                  value={value.startTime}
                  onChange={(newTime) => updateDraftStartTime(index, newTime)}
                  options={START_TIME_OPTIONS}
                />
                -
                <TimeDropdown value={value.endTime} options={TIME_OPTIONS} disabled />
                <button className="size-4" onClick={() => removeTimeSlot(index)}>
                  <X />
                </button>
              </div>
            ))
          )}
          <button
            onClick={addTimeSlot}
            className="flex-1 py-2.5 text-button-md text-gray-500 bg-gray-50 text-center"
          >
            시간 추가
          </button>
        </div>
        <div className="flex gap-2 mt-6 justify-between">
          <button className="ring ring-gray-50 text-button-md text-gray-500" onClick={closeEdit}>
            취소
          </button>
          <button onClick={applyDraft}>수정하기</button>
        </div>
      </div>
    );
  }

  const handleDurationChange = (value: number) => {
    if (finalScheduleList.length !== 0 && scheduleList.length !== 0) {
      setChangeConfirmModal(true);
      setTempDuration(value);
    } else setDurationHours(value);
  };

  const handleConfirmDurationChange = async () => {
    await setDurationHours(tempDuration);
    setFinalScheduleList([]);
    setScheduleList([]);
    setChangeConfirmModal(false);
    setTempDuration(0);
  };

  const addTimeSlot = () => {
    if (!draft) return null;
    const lastTime = draft.slots[draft.slots.length - 1].endTime;

    const nextEnd = addHoursToTime(lastTime, durationHours);

    if (nextEnd === null) {
      alert('duration past midnight');
      return;
    }
    setDraft((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        slots: [
          ...prev.slots,
          {
            startTime: lastTime,
            endTime: nextEnd,
          },
        ],
      };
    });
  };

  const removeTimeSlot = (timeIndex: number) => {
    if (!draft) return null;
    setDraft((prev) => {
      if (!prev) return prev;
      const tempSlot = prev.slots.filter((_, i) => i !== timeIndex);
      return {
        ...prev,
        slots: tempSlot,
      };
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-headline-lg text-gray-600 mb-6">소유시간을 설정해 주세요</h1>
      <div className="grid grid-cols-3 gap-3">
        {MODE_OPTIONS.map((value, index) => (
          <button
            key={index}
            className={cn(
              'flex-1 ring ring-gray-100 text-button-md rounded-xl py-5 bg-purewhite text-black',
              durationHours === value.value && 'bg-black text-white',
            )}
            onClick={() => handleDurationChange(value.value)}
          >
            {value.label}
          </button>
        ))}
      </div>

      <hr />

      <h1 className="text-headline-lg text-gray-600 mb-6">일정을 등록해주세요</h1>

      <div className="flex flex-col gap-5 mb-7">
        {scheduleList.map((day, dateIndex) => (
          <div key={dateIndex} className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span>{formatKoreanDate(day.date)}</span>
              <button onClick={() => handleEdit(dateIndex)}>수정하기</button>
            </div>

            <div className="flex flex-wrap flex-row gap-1">
              {day.slots.map((slot, timeIndex) => (
                <div
                  key={timeIndex}
                  className="py-2.5 px-3 text-gray-400 bg-gray-50 rounded-lg"
                >{`${slot.startTime} - ${slot.endTime}`}</div>
              ))}
            </div>
          </div>
        ))}
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
              disabled={(date) => date < tomorrow}
              selected={dateRange}
              onSelect={setDateRange}
              buttonVariant="ghost"
              classNames={{
                month_caption: 'flex items-center justify-between h-(--cell-size) w-full px-2',
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <TimeDropdown
                value={startTime}
                onChange={setStartTime}
                options={START_TIME_OPTIONS}
              />
              {/* //TODO: NEED TO VALIDATE END TIME */}
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

      {editModal && (
        <ModalDim>
          <EditModal />
        </ModalDim>
      )}
      {changeConfirmModal && (
        <ModalDim>
          <div className="pt-10 pb-5 px-4 rounded-xl bg-white flex flex-col gap-10">
            <div className="flex flex-col gap-1 px-16">
              <span className="text-center">소요시간 변경시</span>
              <span className="text-center">등록한 일정이 삭제됩니다</span>
            </div>
            <div className="flex flex-row justify-between gap-2 w-full">
              <button
                className="bg-gray-50 text-button-md text-gray-500 flex-1 p-3 rounded-lg"
                onClick={() => setChangeConfirmModal(false)}
              >
                취소
              </button>
              <button
                className="bg-black text-button-md text-white flex-1 p-3 rounded-lg"
                onClick={handleConfirmDurationChange}
              >
                변경하기
              </button>
            </div>
          </div>
        </ModalDim>
      )}
    </div>
  );
}

export default ExperienceCalendar;

/* ----------------------------- utils ----------------------------- */

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

// 시간별
export function addHoursToTime(start: string, hours: number) {
  const startMin = timeToMinutes(start);
  const endMin = startMin + hours * 60;
  if (endMin > 24 * 60) return null; // 자정 넘김 차단
  return minutesToTime(endMin);
}

// 소유시간 마다 시간별 추가
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

// 날짜마다 시간 추가
function generateScheduleList(
  dateRange: DateRange,
  timeRange: TimeLine,
  durationHours: number,
): ScheduleLists[] {
  if (!dateRange.from || !dateRange.to) return [];

  const fromKey = toKstDateKey(dateRange.from);
  const toKey = toKstDateKey(dateRange.to);

  const current = dateKeyToKstDate(fromKey);
  const end = dateKeyToKstDate(toKey);

  const slots = splitByHour(timeRange, durationHours); // 날짜와 무관하니 1번만 계산

  const result: ScheduleLists[] = [];

  while (current.getTime() <= end.getTime()) {
    result.push({
      date: toKstDateKey(current), // ✅ 항상 "YYYY-MM-DD"
      slots,
    });

    // KST 기준 하루 증가 (UTC date로 증가)
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return result;
}

// 한글 날짜 변환
function formatKoreanDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);

  // KST 자정 기준 Date 생성 (요일 계산용)
  // KST 00:00 == UTC 전날 15:00
  const date = new Date(Date.UTC(y, m - 1, d, -9, 0, 0, 0));

  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekday = weekdays[date.getUTCDay()]; // ⚠️ UTC 기준으로 읽어야 정확

  return `${m}월 ${d}일 ${weekday}`;
}

// COMPARE TIME
function compareTime(a: string, b: string) {
  return timeToMinutes(a) - timeToMinutes(b);
}

// OVERLAP
function isOverlap(a: TimeLine, b: TimeLine) {
  const aStart = timeToMinutes(a.startTime);
  const aEnd = timeToMinutes(a.endTime);
  const bStart = timeToMinutes(b.startTime);
  const bEnd = timeToMinutes(b.endTime);
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
  prev: ScheduleLists[],
  next: ScheduleLists[],
): { ok: true; merged: ScheduleLists[] } | { ok: false; message: string } {
  const map = new Map<string, TimeLine[]>();

  const put = (item: ScheduleLists) => {
    const key = item.date; // ✅ 이미 "YYYY-MM-DD"
    const existing = map.get(key);

    if (!existing) {
      map.set(key, [...item.slots]);
    } else {
      existing.push(...item.slots);
    }
  };

  prev.forEach(put);
  next.forEach(put);

  const merged: ScheduleLists[] = [];

  for (const [dateKey, slots] of map.entries()) {
    const checked = sortAndValidateDaySlots(slots);

    if (!checked.ok) {
      const { cur, next } = checked.conflict;
      return {
        ok: false,
        message: `Overlapping time slots on ${dateKey}: ${cur.startTime}-${cur.endTime} overlaps ${next.startTime}-${next.endTime}.`,
      };
    }

    merged.push({
      date: dateKey,
      slots: checked.sorted,
    });
  }

  // "YYYY-MM-DD"는 문자열 정렬이 곧 날짜 정렬
  merged.sort((a, b) => a.date.localeCompare(b.date));

  return { ok: true, merged };
}
