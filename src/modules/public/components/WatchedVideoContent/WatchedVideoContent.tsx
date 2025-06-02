'use client';

import { useGetWatched } from '@/api/videos/queries';
import { BaseVideoContent } from '@/components/BaseVideoContent';

type WatchedVideoContentProps = {
  userId: string;
};

export const WatchedVideoContent = ({ userId }: WatchedVideoContentProps) => {
  const { data, isLoading } = useGetWatched({
    params: { userId },
  });

  return (
    <BaseVideoContent
      userId={userId}
      playlistItems={data}
      cardLinkBasePath="/assistidos/video"
      isLoading={isLoading}
    />
  );
};
