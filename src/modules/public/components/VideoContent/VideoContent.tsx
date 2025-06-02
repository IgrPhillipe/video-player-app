'use client';

import { useGetPlaylistVideos, Video } from '@/api/videos';
import { useAddWatched } from '@/api/videos/mutations';
import { BaseVideoContent } from '@/components/BaseVideoContent';
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

  const { mutateAsync } = useAddWatched({
    mutationConfig: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['watched-videos'], refetchType: 'all' });
      },
    },
  });

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetPlaylistVideos({
    params: { videoId: Number(id) },
  });

  useEffect(() => {
    if (video) mutateAsync({ video: video });
  }, [video]);

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
