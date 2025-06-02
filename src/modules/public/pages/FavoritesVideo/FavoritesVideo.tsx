'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { FavoritesVideoContent } from '@/modules/public/components';

type FavoritesVideoProps = {
  dehydratedState: DehydratedState;
  userId: string;
};

export const FavoritesVideo = ({ dehydratedState, userId }: FavoritesVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <FavoritesVideoContent userId={userId} />
  </HydrationBoundary>
);
