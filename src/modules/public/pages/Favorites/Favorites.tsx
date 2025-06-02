'use client';

import { FavoritesContent } from '@/modules/public/components';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

type FavoritesProps = {
  dehydratedState: DehydratedState;
  userId: string;
};

export const Favorites = ({ dehydratedState, userId }: FavoritesProps) => (
  <HydrationBoundary state={dehydratedState}>
    <FavoritesContent userId={userId} />
  </HydrationBoundary>
);
