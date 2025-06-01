'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import { HomeContent } from '../components';

type HomeProps = {
  dehydratedState: unknown;
};

export const Home = ({ dehydratedState }: HomeProps) => (
  <HydrationBoundary state={dehydratedState}>
    <HomeContent />
  </HydrationBoundary>
);
