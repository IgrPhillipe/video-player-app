import { getVideos } from '@/api/videos';
import { getQueryClient } from '@/lib/react-query';
import { Home } from '@/modules/public/pages';
import { dehydrate } from '@tanstack/react-query';

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['videos', undefined],
    queryFn: () => getVideos({ page: 1, search: undefined }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Home dehydratedState={dehydratedState} />;
}
