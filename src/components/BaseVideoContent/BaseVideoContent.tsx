import { PaginatedResponse } from '@/api/common';
import { useGetIsAutoplayEnabled, useGetVideoById } from '@/api/videos';
import { parseInfiniteData } from '@/utils/parser';
import { InfiniteData } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Playlist } from '../Playlist';
import { VideoContentSkeleton } from '../Skeletons';
import { VideoPlayer } from '../VideoPlayer';

type BaseVideoContentProps = {
  userId: string;
  playlistItems: InfiniteData<PaginatedResponse> | undefined;
  isLoading: boolean;
  cardLinkBasePath: string;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
};

export const BaseVideoContent = ({
  userId,
  playlistItems,
  cardLinkBasePath,
  isLoading,
  fetchNextPage,
  isFetchingNextPage = false,
}: BaseVideoContentProps) => {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading: isVideoLoading } = useGetVideoById({
    params: { videoId: Number(id) },
  });

  const { data: isAutoplayEnabled } = useGetIsAutoplayEnabled({
    params: { userId },
  });

  const videos = parseInfiniteData(playlistItems);
  const filteredVideos = videos.filter((v) => v.id !== data?.id).reverse();

  const handleNextVideo = useCallback(() => {
    if (isAutoplayEnabled) {
      router.push(`${cardLinkBasePath}/${filteredVideos?.[0]?.id}`);
    }
  }, [isAutoplayEnabled, router, filteredVideos, cardLinkBasePath]);

  if (isLoading || !data || isVideoLoading) {
    return <VideoContentSkeleton />;
  }

  return (
    <main className="flex lg:flex-row flex-col gap-8 h-full w-full">
      <VideoPlayer video={data} handleNextVideo={handleNextVideo} />

      <Playlist
        userId={userId}
        isAutoplayEnabled={isAutoplayEnabled || false}
        videos={filteredVideos}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
};
