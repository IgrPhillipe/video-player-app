'use client';

import { generateGetWatchedQueryKey, useGetPlaylistVideos, Video } from '@/api/videos';
import { useAddWatched } from '@/api/videos/mutations';
import { BaseVideoContent } from '@/components/BaseVideoContent';
import { parseTitle } from '@/utils/parser';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

type VideoContentProps = {
  userId: string;
  video: Video;
};

export const VideoContent = ({ userId, video }: VideoContentProps) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const title = parseTitle(video.url);

  const { mutateAsync } = useAddWatched({
    mutationConfig: {
      onSuccess: async () => {
        const queryKey = generateGetWatchedQueryKey({ userId });
        await queryClient.invalidateQueries({ queryKey, refetchType: 'all' });
      },
    },
  });

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetPlaylistVideos({
    params: { search: title, videoId: Number(id) },
  });

  useEffect(() => {
    if (data) mutateAsync({ video: video });
  }, [data]);

  return (
    <BaseVideoContent
      userId={userId}
      playlistItems={data}
      cardLinkBasePath="/video"
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};
