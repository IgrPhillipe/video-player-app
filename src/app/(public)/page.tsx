import { generateGetPlaylistVideosQueryKey, getVideos } from '@/api/videos';
import { Home } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = new QueryClient();

  const queryKey = generateGetPlaylistVideosQueryKey({});

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getVideos({ page: 1 }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Home dehydratedState={dehydratedState} />;
}
