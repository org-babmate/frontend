import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//TAILWINDMERGE
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//TOGGLE
export function toggleInArray<T>(list: string[], value: string): string[] {
  if (value === 'All') {
    return ['All'];
  }

  const withoutAll = list.filter((item) => item !== 'All');

  const next = withoutAll.includes(value)
    ? withoutAll.filter((item) => item !== value)
    : [...withoutAll, value];

  return next.length === 0 ? ['All'] : next;
}

type DateInput = string | Date;

///Make Stringfy Date or Date into structure formats
export function getDateInfo(input: DateInput) {
  const date =
    input instanceof Date
      ? input
      : input.includes('T')
        ? new Date(input)
        : (() => {
            const [y, m, d] = input.split('-').map(Number);
            return new Date(y, m - 1, d);
          })();

  const year = date.getFullYear();
  const day = date.getDate();

  const weekdayKorShort = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  const weekdayKorLong = date.toLocaleDateString('ko-KR', { weekday: 'long' });
  const monthKorShort = date.toLocaleDateString('ko-KR', { month: 'short' });
  const monthKorLong = date.toLocaleDateString('ko-KR', { month: 'long' });

  const weekdayEngShort = date.toLocaleDateString('en-US', { weekday: 'short' });
  const weekdayEngLong = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthEngShort = date.toLocaleDateString('en-US', { month: 'short' });
  const monthEngLong = date.toLocaleDateString('en-US', { month: 'long' });

  return {
    year,
    day,

    weekdayKorShort,
    weekdayKorLong,
    weekdayEngShort,
    weekdayEngLong,

    monthKorShort,
    monthKorLong,
    monthEngShort,
    monthEngLong,
  };
}
//
export function toKstDateKey(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

export function dateKeyToKstDate(dateKey: string): Date | undefined {
  const [y, m, d] = dateKey.split('-').map(Number);

  if (!y || !m || !d) return undefined;

  // KST 00:00 == UTC 전날 15:00
  return new Date(Date.UTC(y, m - 1, d, -9, 0, 0, 0));
}

export function getTodayKstDate(): Date {
  const now = new Date();

  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  // UTC → KST (+9h)
  const kst = new Date(utc + 9 * 60 * 60 * 1000);

  kst.setHours(0, 0, 0, 0);

  return kst;
}

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseYMD(value: string | null): Date | undefined {
  if (!value) return undefined;
  // value: 'YYYY-MM-DD'
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return undefined;

  // 로컬 타임존 기준으로 Date 생성 (UTC 파싱 이슈 회피)
  return new Date(y, m - 1, d);
}
