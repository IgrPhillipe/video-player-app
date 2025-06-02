'use client';

import { WatchedVideoContent } from '@/modules/public/components';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

type WatchedVideoProps = {
  dehydratedState: DehydratedState;
  userId: string;
};

export const WatchedVideo = ({ dehydratedState, userId }: WatchedVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <WatchedVideoContent userId={userId} />
  </HydrationBoundary>
);
