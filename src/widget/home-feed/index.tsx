'use client';

import { useHomeFeedQuery } from '@/features/home/model/homefeed-queries';
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
import { RotateCcw, X } from 'lucide-react';
import Image from 'next/image';
function HomeFeedSection() {
  const { data, isLoading } = useHomeFeedQuery();
  //WE need Skeleton
  if (!data || isLoading) {
    return <>...loading</>;
  }
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
              className="gap-0 overflow-y-scroll no-scrollbar bg-background-subtle w-full"
            >
              <SheetClose asChild className="self-end">
                <button className="self-end p-4">
                  <X className="size-6 text-black" />
                </button>
              </SheetClose>
              <SheetTitle></SheetTitle>
              <div>Where</div>
              <div>Date</div>
              <div>Guest</div>
              <SheetFooter className="fixed bottom-0 p-0 w-full">
                <div className="flex flex-row pt-3  justify-between pb-10 bg-white px-4">
                  <button className="px-2 py-3 flex justify-center items-center h-full w-fit gap-1">
                    <RotateCcw className="size-4" />
                    초기화
                  </button>
                  <SheetClose className="w-[230px] h-[44px] py-3 bg-primary-normal text-white rounded-2">
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
          <ReviewCarousel reviews={data.recentReviews} />
        </div>
      </div>
    </div>
  );
}

export default HomeFeedSection;
