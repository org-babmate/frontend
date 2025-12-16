'use client';

import { Minus, Plus } from 'lucide-react';

interface GuestFilterProps {
  count: number;
  onChange: (count: number) => void;
}

export function GuestFilter({ count, onChange }: GuestFilterProps) {
  const handleDecrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };

  const handleIncrement = () => {
    onChange(count + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[16px] font-semibold">Number of Guests</h3>
      <div className="flex flex-row items-center">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ${
            count === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="mx-3 text-[16px] font-medium min-w-[20px] text-center">
          {count}
        </span>
        <button
          onClick={handleIncrement}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
