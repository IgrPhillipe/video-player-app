'use client';

import { Video } from '@/api/videos';
import { WatchedVideoContent } from '@/modules/public/components';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

type WatchedVideoProps = {
  dehydratedState: DehydratedState;
  userId: string;
  video: Video;
};

export const WatchedVideo = ({ dehydratedState, userId, video }: WatchedVideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <WatchedVideoContent userId={userId} video={video} />
  </HydrationBoundary>
);
