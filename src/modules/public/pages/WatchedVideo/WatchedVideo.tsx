'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { WatchedVideoContent } from '../components';

type WatchedVideoProps = {
  dehydratedState: unknown;
  userId: string;
};

export const WatchedVideo = ({ dehydratedState, userId }: WatchedVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <WatchedVideoContent userId={userId} />
  </HydrationBoundary>
);
