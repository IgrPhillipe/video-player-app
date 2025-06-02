'use client';

import { Video as VideoType } from '@/api/videos';
import { VideoContent } from '@/modules/public/components';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

type VideoProps = {
  dehydratedState: DehydratedState;
  userId: string;
  video: VideoType;
};

export const Video = ({ dehydratedState, userId, video }: VideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <VideoContent userId={userId} video={video} />
  </HydrationBoundary>
);
