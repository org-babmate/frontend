'use client';
import { CATEGORIES } from '@/shared/data/categories';
import { cn } from '@/shared/lib/utils';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

function ExperienceCategories({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="w-full">
      <h1 className="text-headline-lg">어떤 경험을 함께할까요?</h1>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {CATEGORIES.map((value, index) => (
          <div
            className={cn(
              'flex w-full h-[110px] justify-center items-end text-gray-500 pb-4 ring ring-gray-100 rounded-lg',
              selectedCategory === value.value && 'bg-gray-400 ring-black text-gray-600',
            )}
            key={index}
            onClick={() => setSelectedCategory(value.value)}
          >
            <span className="text-body-xl">{value.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCategories;
