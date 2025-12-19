'use client';

import { SharedBottomSheet } from '@/shared/ui/bottom-sheet';
import {
  Calendar,
  ChevronDown,
  Languages,
  SlidersHorizontal,
  Star,
  Users,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { DateFilter } from './filters/DateFilter';
import { GuestFilter } from './filters/GuestFilter';
import { PriceFilter } from './filters/PriceFilter';
import { LanguageFilter } from './filters/LanguageFilter';
import { RatingFilter } from './filters/RatingFilter';

const filters = [
  { label: 'Date', icon: Calendar },
  { label: 'Guest', icon: Users },
  { label: 'Price', icon: DollarSign },
  { label: 'Language', icon: Languages },
  { label: 'Rating', icon: Star },
];

export interface FilterState {
  date?: DateRange;
  guest: number;
  price: number[];
  language: string[];
  rating: number[];
}

export interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterBar({ filters: currentFilters, onFilterChange }: FilterBarProps) {
  const [activeTab, setActiveTab] = useState(filters[0].label);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [tempFilters, setTempFilters] = useState<FilterState>(currentFilters);

  const isSelectDisabled = () => {
    switch (activeTab) {
      case 'Date':
        return !tempFilters.date || (!tempFilters.date.from && !tempFilters.date.to);
      case 'Guest':
        return tempFilters.guest === 0;
      default:
        return false;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Date':
        return (
          <DateFilter
            selected={tempFilters.date}
            onSelect={(date) => setTempFilters({ ...tempFilters, date })}
          />
        );
      case 'Guest':
        return (
          <GuestFilter
            count={tempFilters.guest}
            onChange={(guest) => setTempFilters({ ...tempFilters, guest })}
          />
        );
      case 'Price':
        return (
          <PriceFilter
            range={tempFilters.price}
            onChange={(price) => setTempFilters({ ...tempFilters, price })}
          />
        );
      case 'Language':
        return (
          <LanguageFilter
            selected={tempFilters.language}
            onChange={(language) => setTempFilters({ ...tempFilters, language })}
          />
        );
      case 'Rating':
        return (
          <RatingFilter
            range={tempFilters.rating}
            onChange={(rating) => setTempFilters({ ...tempFilters, rating })}
          />
        );
      default:
        return null;
    }
  };

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
      case 'Language':
        if (currentFilters.language.includes('All')) return 'Language';
        if (currentFilters.language.length === 1) return currentFilters.language[0];
        return `${currentFilters.language[0]} +${currentFilters.language.length - 1}`;
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
    setActiveTab(tab);
    setTempFilters(currentFilters);
    setIsSheetOpen(true);
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

      <div className="absolute right-0 flex items-center bg-[linear-gradient(to_left,#ffffff_50%,#ffffff00_100%)] pl-4 py-1">
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
      </div>
    </div>
  );
}
