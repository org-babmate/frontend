import { HomeHosts } from '@/entities/home/model/type';
import { cn } from '@/shared/lib/utils';
import CustomHostCard from '@/shared/ui/card';
import Link from 'next/link';

function FindMateSection({ className, babmates }: { className?: string; babmates: HomeHosts[] }) {
  return (
    <section className={cn('mt-7 flex flex-col gap-5 justify-center', className)}>
      <h1 className="text-headline-lg">Find your Babmate</h1>
      <div className="flex flex-col gap-5">
        {babmates.map((value) => {
          return (
            <CustomHostCard
              key={value.id}
              id={value.id}
              name={value.nickname}
              popBadge={value.popBadge}
              quotes={value.tagline}
              image={value.profileImage}
            />
          );
        })}
      </div>
      <div className="py-5 w-full justify-center text-center text-body-lg">...</div>
      <div className="w-full flex justify-center">
        {/* TODO: LINK TO ALL BABMATE */}
        <Link href={'/'} className="underline underline-offset-2 text-button-md text-gray-600">
          See all Babmates
        </Link>
      </div>
    </section>
  );
}

export default FindMateSection;
