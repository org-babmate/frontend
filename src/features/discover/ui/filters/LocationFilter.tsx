'use client';

import Badge from '@/shared/ui/badge';
import { SEOUL_LOCATIONS, SeoulLocation } from '@/shared/data/locations';
import { cn } from '@/shared/lib/utils';

interface LocationFilterProps {
  selected: SeoulLocation | undefined; // [] === All
  onSelect: (selected: SeoulLocation) => void;
}

export function LocationFilter({ selected, onSelect }: LocationFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="ty-body-1-semibold text-label">Where</h3>
      <div className="flex flex-row gap-2 w-full flex-wrap">
        {SEOUL_LOCATIONS.map((item) => {
          const isSelected = selected && selected.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                'px-3 py-2 rounded-2 ty-label-1-medium font-medium whitespace-nowrap transition-colors border',
                isSelected
                  ? 'bg-primary-normal text-white border-primary-normal'
                  : 'bg-white text-label-subtle border-gray-200 hover:border-gray-300',
              )}
            >
              {item.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
