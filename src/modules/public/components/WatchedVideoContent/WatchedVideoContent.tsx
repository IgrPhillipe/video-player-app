'use client';

import { Video } from '@/api/videos';
import { useGetWatched } from '@/api/videos/queries';
import { BaseVideoContent } from '@/components/BaseVideoContent';

type WatchedVideoContentProps = {
  userId: string;
  video: Video;
};

export const WatchedVideoContent = ({ userId, video }: WatchedVideoContentProps) => {
  const { data, isLoading } = useGetWatched({
    params: { userId },
  });

  return (
    <BaseVideoContent
      userId={userId}
      playlistItems={data}
      cardLinkBasePath="/assistidos/video"
      isLoading={isLoading}
      currentVideo={video}
    />
  );
};
