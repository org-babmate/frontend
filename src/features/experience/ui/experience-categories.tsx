import { CATEGORIES, CategoryValue } from '@/shared/data/categories';
import { cn } from '@/shared/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface Props {
  selectedCategory: CategoryValue;
  setSelectedCategory: Dispatch<SetStateAction<CategoryValue>>;
}

function ExperienceCategories({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="w-full">
      <h1 className="text-heading-1">어떤 경험을 함께할까요?</h1>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {CATEGORIES.map((value, index) => {
          if (value.value === 'all') return;
          return (
            <div
              className={cn(
                'w-full h-27.5  text-gray-500 pt-5 pb-3 ring ring-gray-100 rounded-lg flex flex-col justify-center items-center gap-2',
                selectedCategory === value.value && 'bg-background-subtle ring-black text-black',
              )}
              key={index}
              onClick={() => setSelectedCategory(value.value)}
            >
              <Image alt="category-icons" src={value.icon} width={50} height={50} />
              <span className="text-body-xl">{value.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceCategories;
