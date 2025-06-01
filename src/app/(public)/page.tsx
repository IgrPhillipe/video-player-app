import { getVideos } from '@/api/videos';
import { Home } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['videos', undefined],
    queryFn: () => getVideos({ page: 1, search: undefined }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Home dehydratedState={dehydratedState} />;
}
