'use client';

import { Slider } from '@/shared/ui/slider';

interface RatingFilterProps {
  range: number[];
  onChange: (range: number[]) => void;
}

const ratings = [0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

export function RatingFilter({ range, onChange }: RatingFilterProps) {
  const getRatingLabel = (index: number) => {
    if (index === 0) return 'All';
    return ratings[index].toFixed(1);
  };

  return (
    <div className="flex flex-col gap-6 px-2">
      <h3 className="text-[16px] font-semibold">Minimum Rating</h3>
      <Slider
        defaultValue={[0, 6]}
        value={range}
        min={0}
        max={6}
        step={1}
        onValueChange={onChange}
        className="w-full"
      />
      <div className="flex justify-between text-[12px] font-medium text-gray-500 mt-2">
        {['All', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
