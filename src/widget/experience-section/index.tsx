import { HomeExperiences } from '@/entities/home/model/type';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import { CategoryValue, getCategoryLabel } from '@/shared/data/categories';
import { cn, toggleInArray } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function ExperienceSection({
  experiences,
  categories,
}: {
  experiences: HomeExperiences[];
  categories: CategoryValue[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All']);
  const handleToggle = (value: string) => {
    setSelectedCategories((prev) => toggleInArray(prev, value));
  };

  return (
    <div className="flex flex-col w-full py-5">
      <h1 className="ty-heading-1 py-1">Popular Categories</h1>
      <div
        className={`relative flex flex-row gap-2 py-3 ${
          open ? 'flex-wrap' : 'overflow-x-scroll no-scrollbar'
        } w-full`}
      >
        <Badge
          content={'All'}
          selected={selectedCategories.includes('All')}
          onClick={() => handleToggle('All')}
        />
        {categories.length !== 0 && (
          <>
            {categories.map((value) => (
              <Badge
                key={value}
                content={getCategoryLabel(value)}
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
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {experiences.map((value, index) => {
          return (
            <ExperienceItem
              key={value.id}
              id={value.id}
              title={value.title}
              description={value.description}
              dateTime={''}
              image={value.photos[0]}
              experienceId={value.id}
            />
          );
        })}
      </div>
      <Link
        href={'/discover'}
        prefetch={false}
        className="bg-primary-subtle text-center py-2.5 rounded-full text-primary-normal w-full mt-9 ty-body-2-medium"
      >
        See all Experiences
      </Link>
    </div>
  );
}

export default ExperienceSection;
