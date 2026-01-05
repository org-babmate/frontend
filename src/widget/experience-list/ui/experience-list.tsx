import Link from 'next/link';
import { useMemo } from 'react';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer';
import { DiscoverCard } from '@/features/discover/ui/discover-card';
import { useExperiencesInfiniteQuery } from '@/entities/experiences/model/queries';
import { ExperienceListParams } from '@/entities/experiences/model/types';

interface ExperienceListProps {
  searchParams: ExperienceListParams;
}

export function ExperienceList({ searchParams }: ExperienceListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useExperiencesInfiniteQuery(searchParams);

  console.log('searchParams', searchParams);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const experiences = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  if (isLoading) {
    return <div className="py-10 text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return <div className="py-10 text-center text-red-500">Failed to load experiences.</div>;
  }

  if (experiences.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        No experiences found matching your criteria.
      </div>
    );
  }

  return (
    <>
      {experiences.map((exp) => (
        <Link key={exp.id} href={`/experience/${exp.id}`} className="w-full max-w-[1440px]">
          <DiscoverCard
            image={exp.photos[0] || ''}
            title={exp.title}
            price={exp.price}
            duration={`${exp.durationHours} hours`}
            location={exp.meetingPlace}
            badgeText={exp.category}
          />
        </Link>
      ))}
      <div ref={loadMoreRef} className="h-4 w-full" />
      {isFetchingNextPage && <div className="py-4 text-center text-gray-400">Loading more...</div>}
    </>
  );
}
