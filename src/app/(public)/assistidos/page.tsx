import { getUserId, getWatchedVideos } from '@/api/actions';
import { getQueryClient } from '@/lib/react-query';
import { Watched } from '@/modules/public/pages';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function WatchedPage() {
  const queryClient = getQueryClient();

  const userId = await getUserId();

  await queryClient.prefetchQuery({
    queryKey: ['watched-videos', userId, undefined, undefined],
    queryFn: () => getWatchedVideos({ page: 1, search: undefined }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Watched dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
