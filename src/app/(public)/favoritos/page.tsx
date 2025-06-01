import { getFavoriteVideos, getUserId } from '@/api/actions';
import { getQueryClient } from '@/lib/react-query';
import { Favorites } from '@/modules/public/pages';
import { dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function FavoritesPage() {
  const queryClient = getQueryClient();

  const userId = await getUserId();

  await queryClient.prefetchQuery({
    queryKey: ['favorite-videos', userId, undefined, undefined],
    queryFn: () => getFavoriteVideos({ page: 1, search: undefined }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Favorites dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
