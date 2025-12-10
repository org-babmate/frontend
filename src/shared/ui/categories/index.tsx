'use client';

import { toggleInArray } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import { Dispatch, SetStateAction, useState } from 'react';

interface Categories {
  label: string;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  handleToggle: (value: string) => void;
}

function Categories({
  label,
  categories,
  selectedCategories,
  setSelectedCategories,
  handleToggle,
}: Categories) {
  return (
    <div className="flex flex-col gap-3">
      <h3>{label}</h3>
      <div className="flex flex-row flex-wrap ">
        {categories.map((value) => (
          <Badge
            key={value}
            content={value}
            selected={selectedCategories.includes(value)}
            onClick={() => handleToggle(value)}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
