'use client';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';

function ExperienceCategories() {
  const categories = [
    'Pop-up kitchen',
    'Eat like a local',
    'Cook together',
    'Delivery & chill',
    'Bite the streets',
    'Snack attack',
    'cafe hop & chat',
    'mystery table',
    'picnic in the park',
    'late-night eats',
    'soju nights',
    'mindful eats ',
  ];
  const [selected, setSelected] = useState('');
  return (
    <div className="w-full">
      <h1 className="text-headline-lg">어떤 경험을 함께할까요?</h1>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {categories.map((value, index) => (
          <div
            className={cn(
              'flex w-full h-[110px] justify-center items-end text-gray-500 pb-4 ring ring-gray-100 rounded-lg',
              selected === value && 'bg-gray-400 ring-black text-gray-600',
            )}
            key={index}
            onClick={() => setSelected(value)}
          >
            <span className="text-body-xl">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceCategories;
