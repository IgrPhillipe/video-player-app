'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { WatchedContent } from '../components';

type WatchedProps = {
  dehydratedState: unknown;
  userId: string;
};

export const Watched = ({ dehydratedState, userId }: WatchedProps) => (
  <HydrationBoundary state={dehydratedState}>
    <WatchedContent userId={userId} />
  </HydrationBoundary>
);
