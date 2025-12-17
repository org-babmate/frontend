'use client';

import { format } from 'date-fns';

interface ChatDateDividerProps {
  date: string | Date;
}

export function ChatDateDivider({ date }: ChatDateDividerProps) {
  const formattedDate = format(new Date(date), 'd MMMM yyyy');

  return (
    <div className="flex justify-center py-4">
      <span className="text-xs text-gray-400">{formattedDate}</span>
    </div>
  );
}
