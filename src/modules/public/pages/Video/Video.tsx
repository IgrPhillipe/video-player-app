'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { VideoContent } from '../components';

type VideoProps = {
  dehydratedState: unknown;
};

export const Video = ({ dehydratedState }: VideoProps) => (
  <HydrationBoundary state={dehydratedState}>
    <VideoContent />
  </HydrationBoundary>
);
