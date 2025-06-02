'use client';

import { useGetFavorites } from '@/api/videos/queries';
import { BaseVideoContent } from '@/components/BaseVideoContent';

type FavoritesVideoContentProps = {
  userId: string;
};

export const FavoritesVideoContent = ({ userId }: FavoritesVideoContentProps) => {
  const { data, isLoading } = useGetFavorites({
    params: { userId },
  });

  return (
    <BaseVideoContent
      userId={userId}
      playlistItems={data}
      cardLinkBasePath="/favoritos/video"
      isLoading={isLoading}
    />
  );
};
