'use client';

import { useGetVideos } from '@/api/videos';
import { VideoCard } from '@/components/VideoCard';
import { parseInfiniteData, parseVideoTitle } from '@/utils/parser';
import { useSearchParams } from 'next/navigation';
import { InView } from 'react-intersection-observer';

export const Home = () => {
  const searchParams = useSearchParams();

  const { data, isLoading, fetchNextPage, isFetching } = useGetVideos({
    params: {
      search: searchParams.get('search') ?? searchParams.get('category') ?? undefined,
    },
  });

  const videos = parseInfiniteData(data);

  const handleChangeLoader = (inView: boolean) => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 h-full w-full">
      <section
        className="grid auto-rows-auto gap-y-6 gap-x-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8"
        aria-label="Video grid"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            href={`/video/${video.id}`}
            title={parseVideoTitle(video.url)}
            duration={video.duration}
            thumbnail={video.image}
            author={video.user.name}
          />
        ))}

        <InView
          as="div"
          threshold={0}
          onChange={handleChangeLoader}
          style={{
            paddingTop: '1rem',
          }}
        >
          {!isLoading && isFetching && 'carregando...'}
        </InView>
      </section>
    </main>
  );
};
