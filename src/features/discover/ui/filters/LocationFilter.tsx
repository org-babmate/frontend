'use client';

import Badge from '@/shared/ui/badge';
import { SEOUL_LOCATIONS, SeoulLocation } from '@/shared/data/locations';

interface LocationFilterProps {
  selected: SeoulLocation | undefined; // [] === All
  onSelect: (selected: SeoulLocation) => void;
}

export function LocationFilter({ selected, onSelect }: LocationFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="ty-body-1-semibold text-label">Where</h3>
      <div className="grid grid-cols-2 gap-2">
        {SEOUL_LOCATIONS.map((item) => {
          return (
            <Badge
              key={item.id}
              content={item.labelEn}
              selected={selected && selected.includes(item.id)}
              onClick={() => onSelect(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
