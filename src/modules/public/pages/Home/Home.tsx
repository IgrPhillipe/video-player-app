'use client';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { HomeContent } from '@/modules/public/components';

type HomeProps = {
  dehydratedState: DehydratedState;
};

export const Home = ({ dehydratedState }: HomeProps) => (
  <HydrationBoundary state={dehydratedState}>
    <HomeContent />
  </HydrationBoundary>
);
