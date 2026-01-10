'use client';

import {
  Calendar,
  ChevronDown,
  Languages,
  SlidersHorizontal,
  Star,
  Users,
  DollarSign,
  Menu,
  X,
  Settings2,
  Boxes,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { DateFilter } from './filters/DateFilter';
import { GuestFilter } from './filters/GuestFilter';
import { PriceFilter } from './filters/PriceFilter';
import { LanguageFilter } from './filters/LanguageFilter';
import { RatingFilter } from './filters/RatingFilter';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { CategoryBar } from '@/features/discover/ui/category-bar';
import { CategoryValue } from '@/shared/data/categories';
import { Language, LANGUAGELIST } from '@/shared/data/languageList';
import { useSearchParams } from 'next/navigation';

const filters = [
  { label: 'Date', icon: Calendar },
  { label: 'Guest', icon: Users },
  { label: 'Price', icon: DollarSign },
  { label: 'Language', icon: Languages },
  { label: 'Rating', icon: Star },
  { label: 'Category', icon: Boxes },
];

export interface FilterState {
  date?: DateRange;
  guest: number;
  price: number[];
  language: Language[];
  rating: number[];
  categories: CategoryValue[];
}

export interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterBar({ filters: currentFilters, onFilterChange }: FilterBarProps) {
  // const [activeTab, setActiveTab] = useState(filters[0].label);
  // const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sp = useSearchParams();

  const fromStr = sp.get('from');
  const toStr = sp.get('to');

  const [tempFilters, setTempFilters] = useState<FilterState>(currentFilters);

  const defaultFilter: FilterState = {
    date: undefined,
    guest: 0,
    price: [0, 60],
    language: [],
    rating: [0, 6],
    categories: ['all'],
  };

  // const isSelectDisabled = () => {
  //   switch (activeTab) {
  //     case 'Date':
  //       return !tempFilters.date || (!tempFilters.date.from && !tempFilters.date.to);
  //     case 'Guest':
  //       return tempFilters.guest === 0;
  //     default:
  //       return false;
  //   }
  // };

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'Date':
  //       return (
  //         <DateFilter
  //           selected={tempFilters.date}
  //           onSelect={(date) => setTempFilters({ ...tempFilters, date })}
  //         />
  //       );
  //     case 'Guest':
  //       return (
  //         <GuestFilter
  //           count={tempFilters.guest}
  //           onChange={(guest) => setTempFilters({ ...tempFilters, guest })}
  //         />
  //       );
  //     case 'Price':
  //       return (
  //         <PriceFilter
  //           range={tempFilters.price}
  //           onChange={(price) => setTempFilters({ ...tempFilters, price })}
  //         />
  //       );
  //     case 'Language':
  //       return (
  //         <LanguageFilter
  //           selected={tempFilters.language}
  //           onChange={(language) => setTempFilters({ ...tempFilters, language })}
  //         />
  //       );
  //     case 'Rating':
  //       return (
  //         <RatingFilter
  //           range={tempFilters.rating}
  //           onChange={(rating) => setTempFilters({ ...tempFilters, rating })}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };
  const langLabelEngMap = new Map(LANGUAGELIST.map((l) => [l.id, l.labelEng] as const));

  const getFilterLabel = (filterLabel: string) => {
    switch (filterLabel) {
      case 'Date':
        if (currentFilters.date?.from) {
          if (currentFilters.date.to) {
            return `${format(currentFilters.date.from, 'd MMM yyyy')} - ${format(
              currentFilters.date.to,
              'd MMM yyyy',
            )}`;
          }
          return format(currentFilters.date.from, 'd MMM yyyy');
        }
        return 'Date';
      case 'Guest':
        return currentFilters.guest > 0 ? `${currentFilters.guest}` : 'Guest';
      case 'Price':
        if (currentFilters.price[0] === 0 && currentFilters.price[1] === 60) return 'Price';
        const start = currentFilters.price[0] === 0 ? 'Free' : `$${currentFilters.price[0]}`;
        const end = currentFilters.price[1] >= 60 ? '$60~' : `$${currentFilters.price[1]}`;
        if (start === 'Free' && end === '$60~') return 'Free - $60~';
        return `${start} - ${end}`;
      case 'Language': {
        if (currentFilters.language.length === 0) return 'Language';

        const first = currentFilters.language[0];
        const firstLabel = langLabelEngMap.get(first) ?? first;

        if (currentFilters.language.length === 1) return firstLabel;

        return `${firstLabel} +${currentFilters.language.length - 1}`;
      }
      case 'Rating':
        const getRatingValue = (index: number) => {
          const ratings = [0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
          return ratings[index];
        };
        const rStart = getRatingValue(currentFilters.rating[0]);
        const rEnd = getRatingValue(currentFilters.rating[1]);
        if (rStart === 0 && rEnd === 5.0) return 'Rating';
        const rStartStr = rStart === 0 ? '0' : rStart.toFixed(1);
        const rEndStr = rEnd.toFixed(1);
        return `${rStartStr} - ${rEndStr}`;
      default:
        return filterLabel;
    }
  };

  const handleOpenSheet = (tab: string) => {
    // setActiveTab(tab);
    setTempFilters(currentFilters);
    // setIsSheetOpen(true);
  };

  return (
    <div className="relative flex flex-row gap-2 w-full items-center">
      <div className="flex flex-row gap-2 overflow-x-scroll no-scrollbar w-full pr-12">
        {filters.map((filter) => {
          const label = getFilterLabel(filter.label);
          const isActive = label !== filter.label;
          return (
            <button
              key={filter.label}
              onClick={() => handleOpenSheet(filter.label)}
              className={`flex items-center gap-2 px-[10px] py-[10px] border rounded-[8px] whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-black bg-black text-white'
                  : 'border-gray-100 bg-white text-black'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="text-[12px] font-normal">{label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* <div className="absolute right-0 flex items-center bg-[linear-gradient(to_left,#ffffff_50%,#ffffff00_100%)] pl-4 py-1">
        <SharedBottomSheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (open) setTempFilters(currentFilters);
          }}
          title="Filter"
          isSelectDisabled={isSelectDisabled()}
          onApply={() => {
            onFilterChange(tempFilters);
            setIsSheetOpen(false);
          }}
          trigger={
            <button
              onClick={() => handleOpenSheet(filters[0].label)}
              className="flex items-center justify-center p-[10px] border border-gray-100 rounded-[8px] bg-white"
            >
              <SlidersHorizontal className="w-4 h-4 text-black" />
            </button>
          }
        >
          <div className="flex flex-col w-full">
            <div className="mt-1 w-full border-b border-gray-50">
              <div className="flex flex-row overflow-x-scroll no-scrollbar gap-5">
                {filters.map((filter) => (
                  <button
                    key={`tab-${filter.label}`}
                    onClick={() => setActiveTab(filter.label)}
                    className={`flex items-center gap-2 pb-3 text-[14px] whitespace-nowrap transition-colors border-b-[1.5px] ${
                      activeTab === filter.label
                        ? 'border-gray-600 font-semibold text-gray-900'
                        : 'border-transparent text-gray-400 font-normal'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5">{renderContent()}</div>
          </div>
        </SharedBottomSheet>
      </div>  */}

      <Sheet>
        <SheetTrigger>
          <Settings2 />
        </SheetTrigger>
        <SheetContent
          side={'bottom-full'}
          className="gap-0 h-dvh no-scrollbar bg-background-subtle w-full"
        >
          <SheetTitle className="w-full">
            <SheetClose asChild className="flex w-full justify-end  p-4">
              <button>
                <X />
              </button>
            </SheetClose>
          </SheetTitle>
          <div className="flex flex-col gap-10 px-5 py-4 mb-30">
            <GuestFilter
              count={tempFilters.guest}
              onChange={(guest) => setTempFilters({ ...tempFilters, guest })}
            />
            <DateFilter
              selected={tempFilters.date}
              onSelect={(date) => setTempFilters({ ...tempFilters, date })}
            />
            <LanguageFilter
              selected={tempFilters.language}
              onChange={(language) => setTempFilters({ ...tempFilters, language })}
            />
            <RatingFilter
              range={tempFilters.rating}
              onChange={(rating) => setTempFilters({ ...tempFilters, rating })}
            />
            <CategoryBar
              selected={tempFilters.categories}
              onSelect={(categories) => setTempFilters({ ...tempFilters, categories })}
            />
          </div>
          <SheetFooter className="fixed bottom-0 p-0 w-full">
            <div className="flex flex-row pt-3  justify-between pb-10 bg-white px-4">
              <button
                className="px-2 py-3 flex justify-center items-center h-full w-fit gap-1"
                onClick={() => setTempFilters(defaultFilter)}
              >
                <RotateCcw className="size-4" />
                초기화
              </button>
              <SheetClose
                className="w-[230px] h-[44px] py-3 bg-primary-normal text-white rounded-2"
                onClick={() => onFilterChange(tempFilters)}
              >
                경험 찾기
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
