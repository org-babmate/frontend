import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleInArray<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function getDateInfo(dateStr: string) {
  let date: Date;
  let year: number;

  if (dateStr.includes('T')) {
    date = new Date(dateStr);
    year = date.getFullYear();
  } else {
    const [y, m, d] = dateStr.split('-').map(Number);
    year = y;
    date = new Date(y, m - 1, d);
  }

  const weekdayKorShort = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  const weekdayKorLong = date.toLocaleDateString('ko-KR', { weekday: 'long' });
  const monthKorShort = date.toLocaleDateString('ko-KR', { month: 'short' });
  const monthKorLong = date.toLocaleDateString('ko-KR', { month: 'long' });

  const weekdayEngShort = date.toLocaleDateString('en-US', { weekday: 'short' });
  const weekdayEngLong = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthEngShort = date.toLocaleDateString('en-US', { month: 'short' });
  const monthEngLong = date.toLocaleDateString('en-US', { month: 'long' });

  const day = date.getDate();

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
