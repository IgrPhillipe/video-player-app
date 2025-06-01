import { getVideoById, getVideos } from '@/api/videos';
import { Video } from '@/modules/public/pages';
import { parseTitle } from '@/utils/parser';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type VideoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  const queryClient = new QueryClient();

  const { id } = await params;

  const video = await getVideoById({ videoId: id });

  if (!video) {
    return notFound();
  }

  const title = parseTitle(video?.url);

  await queryClient.prefetchQuery({
    queryKey: ['video-by-id', id],
    queryFn: () => getVideoById({ videoId: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['playlist-videos', title, id],
    queryFn: () => getVideos({ page: 1, search: title }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Video dehydratedState={dehydratedState} />
    </Suspense>
  );
}
