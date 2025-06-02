import { getFavoriteVideos, getUserId, isVideoFavorite } from '@/api/actions';
import {
  generateGetFavoritesQueryKey,
  generateGetVideoByIdQueryKey,
  getVideoById,
} from '@/api/videos';
import { VideoContentSkeleton } from '@/components/Skeletons';
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
  const videoId = Number(id);

  const video = await getVideoById({ videoId });

  if (!video) {
    return notFound();
  }

  const videoIsFavorite = await isVideoFavorite(videoId);

  if (!videoIsFavorite) {
    return notFound();
  }

  const userId = await getUserId();

  await queryClient.prefetchQuery({
    queryKey: generateGetVideoByIdQueryKey({ videoId }),
    queryFn: () => getVideoById({ videoId }),
  });

  const favoriteVideosQueryKey = generateGetFavoritesQueryKey({
    userId,
  });

  await queryClient.prefetchQuery({
    queryKey: favoriteVideosQueryKey,
    queryFn: () => getFavoriteVideos({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<VideoContentSkeleton />}>
      <FavoritesVideo dehydratedState={dehydratedState} userId={userId} video={video} />
    </Suspense>
  );
}
