'use client';

import { useGetVideos } from '@/api/videos/queries';
import { BaseVideoGrid } from '@/components/BaseVideoGrid';
import { InfiniteScrollObserver } from '@/components/InfiniteScrollObserver';
import { VideosSkeleton } from '@/components/Skeletons';
import { ALLOWED_CATEGORIES_MAP } from '@/config';
import { parseInfiniteData } from '@/utils/parser';
import { useSearchParams } from 'next/navigation';

export const HomeContent = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetVideos({
    params: {
      search: search ?? category ?? undefined,
    },
  });

  const videos = parseInfiniteData(data);

  const title = search
    ? `Pesquisa por: ${search}`
    : category
      ? ALLOWED_CATEGORIES_MAP[category as keyof typeof ALLOWED_CATEGORIES_MAP]
      : 'Página Inicial';

  return (
    <BaseVideoGrid isLoading={isLoading} title={title} cardLinkBasePath="/video" items={videos}>
      <InfiniteScrollObserver isLoading={isFetchingNextPage} fetchNextPage={fetchNextPage}>
        <VideosSkeleton isResponsive />
      </InfiniteScrollObserver>
    </BaseVideoGrid>
  );
};
