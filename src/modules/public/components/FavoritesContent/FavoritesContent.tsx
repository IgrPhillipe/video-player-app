'use client';

import { useGetFavorites } from '@/api/videos/queries';
import { BaseVideoGrid } from '@/components/BaseVideoGrid';
import { InfiniteScrollObserver } from '@/components/InfiniteScrollObserver';
import { VideosSkeleton } from '@/components/Skeletons';
import { parseInfiniteData } from '@/utils/parser';
import { useSearchParams } from 'next/navigation';

type FavoritesContentProps = {
  userId: string;
};

export const FavoritesContent = ({ userId }: FavoritesContentProps) => {
  const searchParams = useSearchParams();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetFavorites({
    params: {
      userId,
      search: searchParams.get('search') ?? undefined,
    },
  });

  const videos = parseInfiniteData(data).reverse();

  return (
    <BaseVideoGrid
      isLoading={isLoading}
      title="Favoritos"
      cardLinkBasePath="/favoritos/video"
      items={videos}
    >
      <InfiniteScrollObserver isLoading={isFetchingNextPage} fetchNextPage={fetchNextPage}>
        <VideosSkeleton isResponsive />
      </InfiniteScrollObserver>
    </BaseVideoGrid>
  );
};
