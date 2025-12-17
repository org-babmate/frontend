'use client';

import { cn } from '@/shared/lib/utils';
import { useRef } from 'react';

interface CategoryBarProps {
  categories: string[];
  selected: string[];
  onSelect: (categories: string[]) => void;
}

export function CategoryBar({ categories, selected, onSelect }: CategoryBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (category: string) => {
    if (category === 'All') {
      onSelect(['All']);
      return;
    }

    let newSelected = [...selected];
    
    // If 'All' was selected, remove it
    if (newSelected.includes('All')) {
      newSelected = [];
    }

    if (newSelected.includes(category)) {
      newSelected = newSelected.filter((c) => c !== category);
    } else {
      newSelected.push(category);
    }

    // If nothing selected, default back to 'All'
    if (newSelected.length === 0) {
      newSelected = ['All'];
    }

    onSelect(newSelected);
  };

  return (
    <div className="w-full overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
      >
        {categories.map((category) => {
          const isSelected = selected.includes(category);
          return (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border',
                isSelected
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
