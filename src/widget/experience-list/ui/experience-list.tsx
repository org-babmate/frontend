import { useMemo } from 'react';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer';
import { useExperiencesInfiniteQuery } from '@/entities/experiences/model/queries';
import { ExperienceListParams } from '@/entities/experiences/model/types';
import ExperienceCard from '@/widget/experience-card';

interface ExperienceListProps {
  searchParams: ExperienceListParams;
}

export function ExperienceList({ searchParams }: ExperienceListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useExperiencesInfiniteQuery(searchParams);

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
        <ExperienceCard
          key={exp.id}
          id={exp.id}
          image={exp.photos[0] || ''}
          title={exp.title}
          description={exp.description}
          area={exp.meetingArea}
          guestCount={exp.maxGuests}
          duration={exp.durationHours}
          price={exp.price}
          popbadge={exp.category}
        />
      ))}
      <div ref={loadMoreRef} className="h-4 w-full" />
      {isFetchingNextPage && <div className="py-4 text-center text-gray-400">Loading more...</div>}
    </>
  );
}
