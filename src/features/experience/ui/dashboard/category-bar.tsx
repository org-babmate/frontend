'use client';

import { cn, toggleInArray } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import { ChevronDown, X } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { SharedBottomSheet } from '@/shared/ui/bottom-sheet';

export interface CategoryBarProps {
  categories: string[];
  selected?: string[];
  onSelect?: Dispatch<SetStateAction<string[]>>;
}

export function CategoryBar({ categories, selected = [], onSelect }: CategoryBarProps) {
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selected);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: string, isSheet: boolean) => {
    if (isSheet) {
      setTempSelectedCategories((prev) => {
        const newSelected = toggleInArray(prev, value);
        if (prev.includes('All')) {
          return [value];
        }
        if (newSelected.length === 0) {
          return ['All'];
        }
        return newSelected;
      });
    } else {
      let newSelected: string[];
      if (value === 'All') {
        newSelected = ['All'];
      } else {
        const toggled = toggleInArray(selected, value);
        if (selected.includes('All')) {
          newSelected = [value];
        } else if (toggled.length === 0) {
          newSelected = ['All'];
        } else {
          newSelected = toggled;
        }
      }
      if (onSelect) {
        onSelect(newSelected);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSelectedCategories(selected);
    }
  };

  const handleApply = () => {
    if (onSelect) {
      onSelect(tempSelectedCategories);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-row gap-2 w-full items-center">
      <div className="flex flex-row gap-2 overflow-x-scroll no-scrollbar w-full pr-12">
        {categories.map((value) => (
          <Badge
            key={value}
            content={value}
            selected={selected.includes(value)}
            onClick={() => handleToggle(value, false)}
          />
        ))}
      </div>

      <div className="absolute right-0 flex items-center bg-[linear-gradient(to_left,#ffffff_50%,#ffffff00_100%)] pl-4 py-1">
        <SharedBottomSheet
          title="Category"
          open={isOpen}
          onOpenChange={handleOpenChange}
          onApply={handleApply}
          trigger={
            <button className="flex items-center gap-1 p-2 bg-gray-50 rounded-full">
              <ChevronDown className="h-4 w-4" />
            </button>
          }
        >
          <div className="flex flex-wrap gap-6 overflow-y-auto flex-1 content-start">
            {categories.map((value) => (
              <Badge
                key={`sheet-${value}`}
                content={value}
                selected={tempSelectedCategories.includes(value)}
                onClick={() => handleToggle(value, true)}
              />
            ))}
          </div>
        </SharedBottomSheet>
      </div>
    </div>
  );
}
