'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { FavoritesVideoContent } from '../components';

type FavoritesVideoProps = {
  dehydratedState: unknown;
  userId: string;
};

export const FavoritesVideo = ({ dehydratedState, userId }: FavoritesVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <FavoritesVideoContent userId={userId} />
  </HydrationBoundary>
);
