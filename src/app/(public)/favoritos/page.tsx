import { getFavoriteVideos, getUserId } from '@/api/actions';
import { generateGetFavoritesQueryKey } from '@/api/videos';
import { VideosSkeleton } from '@/components/Skeletons';
import { Favorites } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  const userId = await getUserId();

  const queryKey = generateGetFavoritesQueryKey({
    userId,
  });

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getFavoriteVideos({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<VideosSkeleton />}>
      <Favorites dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
