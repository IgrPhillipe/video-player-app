import { getUserId, getWatchedVideos } from '@/api/actions';
import { generateGetWatchedQueryKey } from '@/api/videos';
import { VideosSkeleton } from '@/components/Skeletons';
import { Watched } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function WatchedPage() {
  const queryClient = new QueryClient();

  const userId = await getUserId();

  const queryKey = generateGetWatchedQueryKey({
    userId,
  });

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getWatchedVideos({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<VideosSkeleton />}>
      <Watched dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
