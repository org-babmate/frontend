'use client';

import { useHomeFeedQuery } from '@/features/home/model/homefeed-queries';
import { SEOUL_LOCATIONS } from '@/shared/data/locations';
import { cn, toKstDateKey } from '@/shared/lib/utils';
import { CustomCalendar } from '@/shared/ui/calendar/custom-calendar';
import SearchMenu from '@/shared/ui/searchMenu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import ExperienceSection from '@/widget/experience-section';
import FindMateSection from '@/widget/find-mate-section';
import ReviewCarousel from '@/widget/review-carousel';
import {
  Calendar,
  ChevronDown,
  Loader2,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  const [selectedTab, setSelectedTab] = useState<'where' | 'date' | 'guest'>('where');
  const router = useRouter();

  const EMPTY_RANGE: DateRange | undefined = undefined;
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(EMPTY_RANGE);
  const [guestCount, setGuestCount] = useState(0);

  const handleDecrement = () => {
    if (guestCount > 0) {
      setGuestCount(guestCount - 1);
    }
  };

  const handleIncrement = () => {
    setGuestCount(guestCount + 1);
  };

  //WE need Skeleton
  if (!data || isLoading) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center">
        <Loader2 className="size-25 animate-spin" />
      </div>
    );
  }

  const handleReset = () => {
    setSelectedDate(EMPTY_RANGE);
    setGuestCount(0);
  };

  const goNext = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.append('loc', selectedLocation);
    if (selectedDate?.from) params.set('from', toKstDateKey(selectedDate.from));
    if (selectedDate?.to) params.set('to', toKstDateKey(selectedDate.to));
    params.set('guest', String(guestCount));
    router.push(`/discover?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="relative flex w-full flex-col pt-14">
        <div className="relative z-20 aspect-9/5 w-screen">
          <Image src="/banner.gif" alt="banner" fill objectFit="cover" priority />
          <Sheet>
            <SheetTrigger asChild>
              <div className="absolute right-0 -bottom-5 left-0 z-50 px-4">
                <SearchMenu className="w-full" />
              </div>
            </SheetTrigger>
            <SheetContent
              side={'bottom-full'}
              className="no-scrollbar bg-background-subtle h-dvh w-full gap-0 overflow-y-scroll pb-28"
            >
              <SheetClose asChild className="self-end" autoFocus={false}>
                <button className="self-end p-4">
                  <X className="size-6 text-black" />
                </button>
              </SheetClose>
              <SheetTitle></SheetTitle>
              <div className="flex flex-col gap-3 overflow-y-scroll px-4">
                <div
                  className="shadow-1 rounded-5 bg-white px-4 py-5"
                  onClick={() => setSelectedTab('where')}
                >
                  {selectedTab === 'where' ? (
                    <div className="flex flex-col gap-3">
                      <h3 className="ty-body-1-semibold text-label">Where</h3>

                      <div className="grid grid-cols-2 gap-2">
                        {SEOUL_LOCATIONS.map((value) => {
                          return (
                            <div
                              key={value.id}
                              onClick={() => setSelectedLocation(value.id)}
                              className={cn(
                                'rounded-2 border py-2 text-center transition-colors',
                                selectedLocation === value.id
                                  ? 'border-primary-normal bg-primary-subtle text-primary-normal'
                                  : 'border-gray-200 bg-white text-gray-700',
                              )}
                            >
                              {value.labelEn}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Where</h3>
                      </div>
                      <span className="ty-label-1-semibold text-black">
                        <ChevronDown />
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="shadow-1 rounded-5 bg-white px-4 py-5"
                  onClick={() => setSelectedTab('date')}
                >
                  {selectedTab === 'date' ? (
                    <div className="flex w-full flex-col gap-3">
                      <h3 className="ty-body-1-semibold text-label">Date</h3>
                      <hr />
                      <CustomCalendar
                        className="rounded-5 w-full bg-white"
                        mode="range"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Date</h3>
                      </div>
                      <span className="ty-label-1-semibold text-label">
                        <ChevronDown />
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="shadow-1 rounded-5 bg-white px-4 py-5"
                  onClick={() => setSelectedTab('guest')}
                >
                  {selectedTab === 'guest' ? (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-body-1-semibold text-label">Guest</h3>
                      <div className="flex flex-row items-center">
                        <button
                          onClick={handleDecrement}
                          disabled={guestCount === 0}
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ${
                            guestCount === 0 ? 'cursor-not-allowed opacity-50' : ''
                          }`}
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="mx-3 min-w-[20px] text-center text-[16px] font-medium">
                          {guestCount}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Guest</h3>
                      </div>
                      <span className="ty-label-1-semibold text-label">
                        <ChevronDown />
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <SheetFooter className="fixed bottom-0 z-10 h-fit w-full p-0">
                <div className="flex flex-row justify-between bg-white px-4 pt-3 pb-10">
                  <button
                    className="flex h-full w-fit items-center justify-center gap-1 px-2 py-3"
                    onClick={handleReset}
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </button>
                  <SheetClose
                    className="bg-primary-normal rounded-2 h-[44px] w-[230px] py-3 text-white"
                    onClick={goNext}
                  >
                    Search
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex w-full flex-col justify-center px-4 pt-7">
          <FindMateSection babmates={data.hosts} />
          <ExperienceSection experiences={data.experiences} categories={data.recentCategories} />
        </div>
        <ReviewCarousel reviews={data.recentReviews} />
      </div>
    </div>
  );
}

export default HomeFeedSection;
