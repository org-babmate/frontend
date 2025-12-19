import { HomeExperiences } from '@/entities/home/model/type';
import { CategoryBar } from '@/features/experience/ui/dashboard/category-bar';
import ExperienceItem from '@/features/experience/ui/dashboard/experience-item';
import { cn, toggleInArray } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  'All',
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

function ExperienceSection({ experiences }: { experiences: HomeExperiences[] }) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleToggle = (value: string) => {
    setSelectedCategories((prev) => toggleInArray(prev, value));
  };

  return (
    <div className="pt-8 pb-5 mb-10">
      <h1 className="text-headline-lg mb-7">Popular Categories</h1>
      {/* <CategoryBar categories={categories} selected={['All']} onSelect={setSelecetedCategory} /> */}
      <div
        className={`relative flex flex-row gap-2 ${
          open ? 'flex-wrap' : 'overflow-x-scroll no-scrollbar'
        } w-full`}
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
      <div className="flex flex-col">
        {experiences.map((value, index) => {
          return (
            <div key={index}>
              {index !== 0 && <hr />}
              <ExperienceItem
                id={value.id}
                title={value.title}
                description={value.description}
                dateTime={''}
                image={value.photos[0]}
              />
              ;
            </div>
          );
        })}
        <div className="py-5 w-full justify-center text-center text-body-lg">...</div>
        <div className="w-full flex justify-center">
          <Link
            href={'/discover'}
            className="underline underline-offset-2 text-button-md text-gray-600"
          >
            See all experiences
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
