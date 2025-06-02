'use client';

import { WatchedContent } from '@/modules/public/components';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

type WatchedProps = {
  dehydratedState: DehydratedState;
  userId: string;
};

export const Watched = ({ dehydratedState, userId }: WatchedProps) => (
  <HydrationBoundary state={dehydratedState}>
    <WatchedContent userId={userId} />
  </HydrationBoundary>
);
