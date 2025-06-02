import { getUserId } from '@/api/actions';
import {
  generateGetPlaylistVideosQueryKey,
  generateGetVideoByIdQueryKey,
  getVideoById,
  getVideos,
} from '@/api/videos';
import { VideoContentSkeleton } from '@/components/Skeletons';
import { Video } from '@/modules/public/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type VideoPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: VideoPageProps) => {
  const { id } = await params;
  const videoId = Number(id);
  const video = await getVideoById({ videoId });

  if (!video) {
    return notFound();
  }

  const title = video.name;

  return {
    title,
    description: video.user.name,
    openGraph: {
      title,
      description: video.user.name,
      images: video.pictures.base_link,
    },
  };
};

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const userId = await getUserId();
  const videoId = Number(id);

  const video = await getVideoById({ videoId });

  if (!video) {
    return notFound();
  }

  const title = video.name;

  await queryClient.prefetchQuery({
    queryKey: generateGetVideoByIdQueryKey({ videoId }),
    queryFn: () => getVideoById({ videoId }),
  });

  await queryClient.prefetchQuery({
    queryKey: generateGetPlaylistVideosQueryKey({
      search: title,
      videoId,
    }),
    queryFn: () => getVideos({ page: 1, search: title }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<VideoContentSkeleton />}>
      <Video dehydratedState={dehydratedState} userId={userId} video={video} />
    </Suspense>
  );
}
