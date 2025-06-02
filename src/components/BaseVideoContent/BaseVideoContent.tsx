'use client';

import { PaginatedResponse } from '@/api/common';
import { useGetIsAutoplayEnabled } from '@/api/videos';
import { Video } from '@/api/videos/types';
import { getIdFromUri } from '@/utils/functions';
import { checkIfVideoIsForbidden } from '@/utils/functions/checkIfVideoIsForbidden';
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
  const { id } = useParams();

  const { data: isAutoplayEnabled } = useGetIsAutoplayEnabled({
    params: { userId },
  });

  const videos = useMemo(
    () => parseInfiniteData(playlistItems).filter((video) => !checkIfVideoIsForbidden(video)),
    [playlistItems],
  );

  const filteredVideos = useMemo(
    () =>
      videos
        .filter((v) => {
          const itemId = getIdFromUri(v.uri);
          return itemId !== Number(id);
        })
        .reverse(),
    [videos, id],
  );

  const handleNextVideo = useCallback(() => {
    if (isAutoplayEnabled) {
      const nextVideo = filteredVideos?.[0];
      if (nextVideo) {
        const nextVideoId = getIdFromUri(nextVideo.uri);
        router.push(`${cardLinkBasePath}/${nextVideoId}`);
      }
    }
  }, [isAutoplayEnabled, router, filteredVideos, cardLinkBasePath]);

  if (isLoading) {
    return <VideoContentSkeleton />;
  }

  return (
    <main className="flex lg:flex-row flex-col gap-8 h-full w-full">
      <VideoPlayer
        video={currentVideo}
        handleNextVideo={handleNextVideo}
        isAutoplayEnabled={isAutoplayEnabled}
      />

      <Playlist
        userId={userId}
        isLoading={isLoading}
        isAutoplayEnabled={isAutoplayEnabled || false}
        videos={filteredVideos}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
};
