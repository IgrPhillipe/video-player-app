'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { Video } from '@/api/videos';
import { FavoritesVideoContent } from '@/modules/public/components';

type FavoritesVideoProps = {
  dehydratedState: DehydratedState;
  userId: string;
  video: Video;
};

export const FavoritesVideo = ({ dehydratedState, userId, video }: FavoritesVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <FavoritesVideoContent userId={userId} video={video} />
  </HydrationBoundary>
);
