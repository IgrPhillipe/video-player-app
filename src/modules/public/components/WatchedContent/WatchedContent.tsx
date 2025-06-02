'use client';

import { useGetWatched } from '@/api/videos/queries';
import { BaseVideoGrid } from '@/components/BaseVideoGrid';
import { InfiniteScrollObserver } from '@/components/InfiniteScrollObserver';
import { VideosSkeleton } from '@/components/Skeletons';
import { parseInfiniteData } from '@/utils/parser';
import { useSearchParams } from 'next/navigation';

type WatchedContentProps = {
  userId: string;
};

export const WatchedContent = ({ userId }: WatchedContentProps) => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetWatched({
    params: {
      userId,
      search: search ?? undefined,
    },
  });

  const videos = parseInfiniteData(data).reverse();

  return (
    <BaseVideoGrid
      isLoading={isLoading}
      title="Assistidos"
      cardLinkBasePath="/assistidos/video"
      items={videos}
    >
      <InfiniteScrollObserver isLoading={isFetchingNextPage} fetchNextPage={fetchNextPage}>
        <VideosSkeleton isResponsive />
      </InfiniteScrollObserver>
    </BaseVideoGrid>
  );
};
