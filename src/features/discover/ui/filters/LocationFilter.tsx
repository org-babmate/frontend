'use client';

import Badge from '@/shared/ui/badge';
import { ALL_SEOUL_LOCATIONS, SEOUL_LOCATIONS, SeoulLocation } from '@/shared/data/locations';

interface LocationFilterProps {
  selected: SeoulLocation[]; // [] === All
  onSelect: (selected: SeoulLocation[]) => void;
}

export function toggleLocation(selected: SeoulLocation[], value: SeoulLocation): SeoulLocation[] {
  return selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
}

export function LocationFilter({ selected, onSelect }: LocationFilterProps) {
  const isAllSelected = selected.length === SEOUL_LOCATIONS.length;

  const handleToggleAll = () => {
    onSelect([]);
  };

  const handleToggleOne = (value: SeoulLocation) => {
    const next = toggleLocation(selected, value);
    onSelect(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="ty-body-1-semibold text-label">Where</h3>
      <div className="grid grid-cols-2 gap-2">
        {SEOUL_LOCATIONS.map((item) => {
          return (
            <Badge
              key={item.id}
              content={item.labelEn}
              selected={!isAllSelected && selected.includes(item.id)}
              onClick={() => handleToggleOne(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
