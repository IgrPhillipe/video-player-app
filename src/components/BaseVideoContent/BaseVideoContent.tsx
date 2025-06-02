import { PaginatedResponse } from '@/api/common';
import { useGetIsAutoplayEnabled, useGetVideoById } from '@/api/videos';
import { getIdFromUri } from '@/utils/functions';
import { parseInfiniteData } from '@/utils/parser';
import { InfiniteData } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
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

  const filteredVideos = useMemo(
    () =>
      videos
        .filter((v) => {
          const itemId = getIdFromUri(v.uri);
          return itemId !== Number(id);
        })
        .reverse(),
    [videos, data],
  );

  const handleNextVideo = useCallback(() => {
    if (isAutoplayEnabled) {
      const nextVideo = filteredVideos?.[0];
      const nextVideoId = getIdFromUri(nextVideo.uri);
      router.push(`${cardLinkBasePath}/${nextVideoId}`);
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
