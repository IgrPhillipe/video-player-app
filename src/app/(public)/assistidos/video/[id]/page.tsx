import { getUserId, getWatchedVideos, isVideoWatched } from '@/api/actions';
import {
  generateGetVideoByIdQueryKey,
  generateGetWatchedQueryKey,
  getVideoById,
} from '@/api/videos';
import { VideoContentSkeleton } from '@/components/Skeletons';
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
  const videoId = Number(id);

  const video = await getVideoById({ videoId });

  if (!video) {
    return notFound();
  }

  const videoIsWatched = await isVideoWatched(videoId);

  if (!videoIsWatched) {
    return notFound();
  }

  const userId = await getUserId();

  await queryClient.prefetchQuery({
    queryKey: generateGetVideoByIdQueryKey({ videoId }),
    queryFn: () => getVideoById({ videoId }),
  });

  await queryClient.prefetchQuery({
    queryKey: generateGetWatchedQueryKey({ userId }),
    queryFn: () => getWatchedVideos({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<VideoContentSkeleton />}>
      <WatchedVideo dehydratedState={dehydratedState} userId={userId} video={video} />
    </Suspense>
  );
}
