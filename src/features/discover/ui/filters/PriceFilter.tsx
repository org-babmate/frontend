'use client';

import { Slider } from '@/shared/ui/slider';

interface PriceFilterProps {
  range: number[];
  onChange: (range: number[]) => void;
}

export function PriceFilter({ range, onChange }: PriceFilterProps) {
  return (
    <div className="flex flex-col gap-6 px-2">
      <h3 className="text-[16px] font-semibold">Price</h3>
      <Slider
        defaultValue={[0, 60]}
        value={range}
        min={0}
        max={60}
        step={10}
        onValueChange={onChange}
        className="w-full"
      />
      <div className="flex justify-between text-[12px] font-medium text-gray-500 mt-2">
        {['Free', '$10', '$20', '$30', '$40', '$50', '$60~'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
