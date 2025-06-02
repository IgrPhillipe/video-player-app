import { getFavoriteVideos, getUserId } from '@/api/actions';
import { generateGetFavoritesQueryKey } from '@/api/videos';
import { Favorites } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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

  return <Favorites dehydratedState={dehydratedState} userId={userId} />;
}
