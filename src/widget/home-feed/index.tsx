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
import { Calendar, MapPin, Minus, Plus, RotateCcw, User, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  const [selectedTab, setSelectedTab] = useState<'where' | 'date' | 'guest'>('where');
  const router = useRouter();

  const MAX = 3;

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
    return <>...loading</>;
  }

  const handleReset = () => {
    setSelectedDate(EMPTY_RANGE);
    setGuestCount(0);
  };

  const goNext = () => {
    const params = new URLSearchParams();

    if (selectedLocation) params.append('loc', selectedLocation);

    // date range
    if (selectedDate?.from) params.set('from', toKstDateKey(selectedDate.from));
    if (selectedDate?.to) params.set('to', toKstDateKey(selectedDate.to));

    params.set('guest', String(guestCount));

    router.push(`/discover?${params.toString()}`);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col w-full pt-14 relative">
        <div className="relative w-screen aspect-9/5 z-20">
          <Image src="/banner.gif" alt="banner" fill objectFit="cover" priority />
          <Sheet>
            <SheetTrigger asChild>
              <div className="absolute left-0 right-0 -bottom-5 z-50 px-4">
                <SearchMenu className="w-full" />
              </div>
            </SheetTrigger>
            <SheetContent
              side={'bottom-full'}
              className="gap-0 no-scrollbar bg-background-subtle w-full h-dvh overflow-y-scroll pb-28"
            >
              <SheetClose asChild className="self-end">
                <button className="self-end p-4">
                  <X className="size-6 text-black" />
                </button>
              </SheetClose>
              <SheetTitle></SheetTitle>
              <div className="flex flex-col gap-3 px-4 overflow-y-scroll">
                <div
                  className="bg-white shadow-1 rounded-5 px-4 py-5"
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
                                'border rounded-2 py-2 text-center transition-colors',
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
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Where</h3>
                      </div>
                      <span className="ty-label-1-semibold text-primary-normal">변경</span>
                    </div>
                  )}
                </div>
                <div
                  className="bg-white shadow-1 rounded-5 px-4 py-5"
                  onClick={() => setSelectedTab('date')}
                >
                  {selectedTab === 'date' ? (
                    <div className="flex flex-col gap-3 w-full">
                      <h3 className="ty-body-1-semibold text-label">Date</h3>
                      <hr />
                      <CustomCalendar
                        className="w-full bg-white rounded-5"
                        mode="range"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />{' '}
                    </div>
                  ) : (
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Date</h3>
                      </div>
                      <span className="ty-label-1-semibold text-primary-normal">변경</span>
                    </div>
                  )}
                </div>
                <div
                  className="bg-white shadow-1 rounded-5 px-4 py-5"
                  onClick={() => setSelectedTab('guest')}
                >
                  {selectedTab === 'guest' ? (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-body-1-semibold text-label">Guest</h3>
                      <div className="flex flex-row items-center">
                        <button
                          onClick={handleDecrement}
                          disabled={guestCount === 0}
                          className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 ${
                            guestCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="mx-3 text-[16px] font-medium min-w-[20px] text-center">
                          {guestCount}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="size-4" />
                        <h3 className="ty-body-1-semibold text-label">Guest</h3>
                      </div>
                      <span className="ty-label-1-semibold text-primary-normal">변경</span>
                    </div>
                  )}
                </div>
              </div>
              <SheetFooter className="fixed bottom-0 p-0 w-full z-10 h-fit">
                <div className="flex flex-row pt-3  justify-between pb-10 bg-white px-4">
                  <button
                    className="px-2 py-3 flex justify-center items-center h-full w-fit gap-1"
                    onClick={handleReset}
                  >
                    <RotateCcw className="size-4" />
                    초기화
                  </button>
                  <SheetClose
                    className="w-[230px] h-[44px] py-3 bg-primary-normal text-white rounded-2"
                    onClick={goNext}
                  >
                    경험 찾기
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-col w-full justify-center px-4 pt-[28px]">
          <FindMateSection babmates={data.hosts} />
          <ExperienceSection experiences={data.experiences} categories={data.recentCategories} />
        </div>
        <ReviewCarousel reviews={data.recentReviews} />
      </div>
    </div>
  );
}

export default HomeFeedSection;
