import { HomeHosts } from '@/entities/home/model/type';
import { cn } from '@/shared/lib/utils';
import CustomHostCard from '@/shared/ui/card';
import Link from 'next/link';

function FindMateSection({ className, babmates }: { className?: string; babmates: HomeHosts[] }) {
  return (
    <section className={cn('py-5 flex flex-col gap-9 justify-center w-full', className)}>
      <h1 className="ty-heading-1 py-1">Find your Babmate</h1>
      <div className="flex flex-col gap-4">
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
      <Link
        href="/hosts"
        prefetch={false}
        className="bg-primary-subtle text-center py-2.5 rounded-full text-primary-normal ty-body-2-medium"
      >
        See all Babmate
      </Link>
    </section>
  );
}

export default FindMateSection;
