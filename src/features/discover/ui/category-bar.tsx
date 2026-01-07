'use client';

import { CATEGORIES, CategoryValue } from '@/shared/data/categories';
import { cn } from '@/shared/lib/utils';

interface CategoryBarProps {
  selected: CategoryValue[];
  onSelect: (categories: CategoryValue[]) => void;
}

export function CategoryBar({ selected = ['all'], onSelect }: CategoryBarProps) {
  const handleSelect = (category: CategoryValue) => {
    if (category === 'all') {
      onSelect(['all']);
      return;
    }

    let newSelected = [...selected];
    if (newSelected.includes('all')) {
      newSelected = [];
    }

    if (newSelected.includes(category)) {
      newSelected = newSelected.filter((c) => c !== category);
    } else {
      newSelected.push(category);
    }

    // If nothing selected, default back to 'All'
    if (newSelected.length === 0) {
      newSelected = ['all'];
    }

    onSelect(newSelected);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h3 className="text-[16px] font-semibold">Minimum Rating</h3>
      <div className="flex flex-row flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selected.includes(category.value);
          return (
            <button
              key={category.value}
              onClick={() => handleSelect(category.value)}
              className={cn(
                'px-3 py-2 rounded-2 text-sm font-medium whitespace-nowrap transition-colors border',
                isSelected
                  ? 'bg-primary-normal text-white border-primary-normal'
                  : 'bg-white text-label-subtle border-gray-200 hover:border-gray-300',
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
