import { PaginatedResponse } from '@/api/common';
import { useGetIsAutoplayEnabled, Video } from '@/api/videos';
import { parseInfiniteData } from '@/utils/parser';
import { InfiniteData } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
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
  currentVideo: Video;
};

export const BaseVideoContent = ({
  userId,
  playlistItems,
  cardLinkBasePath,
  isLoading,
  fetchNextPage,
  isFetchingNextPage = false,
  currentVideo,
}: BaseVideoContentProps) => {
  const router = useRouter();

  const { data: isAutoplayEnabled } = useGetIsAutoplayEnabled({
    params: { userId },
  });

  const videos = parseInfiniteData(playlistItems);
  const filteredVideos = useMemo(
    () => videos.filter((v) => v.id !== currentVideo.id).reverse(),
    [videos, currentVideo],
  );

  const handleNextVideo = useCallback(() => {
    if (isAutoplayEnabled) {
      router.push(`${cardLinkBasePath}/${filteredVideos?.[0]?.id}`);
    }
  }, [isAutoplayEnabled, router, filteredVideos, cardLinkBasePath]);

  if (isLoading) {
    return <VideoContentSkeleton />;
  }

  return (
    <main className="flex lg:flex-row flex-col gap-8 h-full w-full">
      <VideoPlayer video={currentVideo} handleNextVideo={handleNextVideo} />

      <Playlist
        userId={userId}
        isAutoplayEnabled={isAutoplayEnabled || false}
        isLoading={isLoading}
        videos={filteredVideos}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
};
