'use client';

import { cn, toggleInArray } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Categories {
  categories: string[];
}

export function CategoryBar({ categories }: Categories) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleToggle = (value: string) => {
    setSelectedCategories((prev) => toggleInArray(prev, value));
  };

  return (
    <div
      className={`relative flex flex-row gap-2 ${open ? 'flex-wrap' : 'overflow-x-scroll'} w-full`}
    >
      {categories.map((value) => (
        <Badge
          key={value}
          content={value}
          selected={selectedCategories.includes(value)}
          onClick={() => handleToggle(value)}
        />
      ))}
      <div
        className={` flex items-center   ${
          open
            ? 'px-0 py-0 bg-transparent'
            : 'sticky right-0 px-4 py-1 bg-[linear-gradient(to_left,#fafafa_10%,#fafafa00_100%)]'
        } `}
      >
        <button
          className="flex items-center gap-1 p-2 bg-gray-50 rounded-full"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </button>
      </div>
    </div>
  );
}
