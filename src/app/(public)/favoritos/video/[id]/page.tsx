import { getFavoriteVideos, getUserId } from '@/api/actions';
import { getVideoById } from '@/api/videos';
import { FavoritesVideo } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type FavoritesVideoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FavoritesVideoPage({ params }: FavoritesVideoPageProps) {
  const queryClient = new QueryClient();

  const { id } = await params;

  const video = await getVideoById({ videoId: id });

  if (!video) {
    return notFound();
  }

  const userId = await getUserId();

  await queryClient.prefetchQuery({
    queryKey: ['video-by-id', id],
    queryFn: () => getVideoById({ videoId: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['favorite-videos', userId, undefined, id],
    queryFn: () => getFavoriteVideos({ page: 1, search: undefined, fromVideoId: parseInt(id) }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesVideo dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
