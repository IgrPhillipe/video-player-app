import { getUserId, getWatchedVideos } from '@/api/actions';
import { getVideoById } from '@/api/videos';
import { WatchedVideo } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type WatchedVideoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WatchedVideoPage({ params }: WatchedVideoPageProps) {
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
    queryKey: ['watched-videos', userId, undefined, id],
    queryFn: () => getWatchedVideos({ page: 1, fromVideoId: parseInt(id) }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WatchedVideo dehydratedState={dehydratedState} userId={userId} />
    </Suspense>
  );
}
