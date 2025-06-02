'use client';

import { Video } from '@/api/videos';
import { useGetFavorites } from '@/api/videos/queries';
import { BaseVideoContent } from '@/components/BaseVideoContent';

type FavoritesVideoContentProps = {
  userId: string;
  video: Video;
};

export const FavoritesVideoContent = ({ userId, video }: FavoritesVideoContentProps) => {
  const { data, isLoading } = useGetFavorites({
    params: { userId },
  });

  return (
    <BaseVideoContent
      userId={userId}
      playlistItems={data}
      cardLinkBasePath="/favoritos/video"
      isLoading={isLoading}
      currentVideo={video}
    />
  );
};
