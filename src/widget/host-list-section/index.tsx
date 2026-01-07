'use client';

import { useHostListInfiniteQuery } from '@/features/host/model/host-profile-queries';
import { CATEGORIES, CategoryValue, getCategoryLabel } from '@/shared/data/categories';
import { useIntersectionObserver } from '@/shared/lib/hooks/use-intersection-observer';
import { cn } from '@/shared/lib/utils';
import Badge from '@/shared/ui/badge';
import CustomHostCard from '@/shared/ui/card';
import { ChevronDown } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

const ALL = 'All' as const;
type AllValue = typeof ALL;
type CategoryOrAll = CategoryValue | AllValue;

function HostListSection() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOrAll[]>(['All']);

  const handleToggle = useCallback((value: CategoryOrAll) => {
    setSelectedCategories((prev) => {
      if (value === ALL) return [ALL];

      const next = prev.includes(ALL)
        ? [value]
        : prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];

      return next.length === 0 ? [ALL] : next;
    });
  }, []);

  const selectedSet = useMemo(() => new Set(selectedCategories), [selectedCategories]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useHostListInfiniteQuery();

  const hosts = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);

  // (옵션) 클라이언트 필터링
  const onIntersect = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const sentinelRef = useIntersectionObserver({
    onIntersect,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    rootMargin: '200px',
    threshold: 0.1,
  });

  const activeCategories = useMemo(
    () => selectedCategories.filter((c): c is CategoryValue => c !== ALL),
    [selectedCategories],
  );

  const filteredHosts = useMemo(() => {
    if (activeCategories.length === 0) return hosts;
    return hosts.filter((h) =>
      h.popBadge?.some((badge) => activeCategories.includes(badge as CategoryValue)),
    );
  }, [hosts, activeCategories]);

  if (isLoading) return <div>loading...</div>;
  if (isError || !data) return <div>failed</div>;

  return (
    <div>
      <h1 className="text-heading-1 py-1">Popular Categories</h1>
      <div
        className={cn(
          'relative flex flex-row gap-2 w-full',
          open ? 'flex-wrap' : 'overflow-x-scroll no-scrollbar',
        )}
      >
        <Badge content={ALL} selected={selectedSet.has(ALL)} onClick={() => handleToggle(ALL)} />
        {CATEGORIES.map((c) => (
          <Badge
            key={c.value}
            content={getCategoryLabel(c.value)}
            selected={selectedSet.has(c.value)}
            onClick={() => handleToggle(c.value)}
          />
        ))}

        <div
          className={cn(
            'flex items-center',
            open
              ? 'px-0 py-0 bg-transparent'
              : 'sticky right-0 px-4 py-1 bg-[linear-gradient(to_left,#fafafa_10%,#fafafa00_100%)]',
          )}
        >
          <button
            className="flex items-center gap-1 p-2 bg-gray-50 rounded-full"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle categories"
          >
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {filteredHosts.map((h) => (
          <CustomHostCard
            key={h.id}
            id={h.id}
            name={h.nickname}
            popBadge={h.popBadge}
            quotes={h.tagline}
            image={h.profileImage}
          />
        ))}

        <div ref={sentinelRef} className="h-8" />
        {isFetchingNextPage && <div className="text-sm text-gray-400">loading more...</div>}
      </div>
    </div>
  );
}

export default HostListSection;
