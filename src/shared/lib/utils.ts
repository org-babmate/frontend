import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

//TAILWINDMERGE
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//TOGGLE
export function toggleInArray<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
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

export function toKstDateKey(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

export function dateKeyToKstDate(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  // KST 00:00 == UTC 전날 15:00
  return new Date(Date.UTC(y, m - 1, d, -9, 0, 0, 0));
}
