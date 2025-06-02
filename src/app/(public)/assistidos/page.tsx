import { getUserId, getWatchedVideos } from '@/api/actions';
import { generateGetWatchedQueryKey } from '@/api/videos';
import { Watched } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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

  return <Watched dehydratedState={dehydratedState} userId={userId} />;
}
