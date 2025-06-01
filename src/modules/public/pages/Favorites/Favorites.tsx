'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { FavoritesContent } from '../components';

type FavoritesProps = {
  dehydratedState: unknown;
  userId: string;
};

export const Favorites = ({ dehydratedState, userId }: FavoritesProps) => (
  <HydrationBoundary state={dehydratedState}>
    <FavoritesContent userId={userId} />
  </HydrationBoundary>
);
