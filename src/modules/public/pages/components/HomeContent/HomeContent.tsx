'use client';

import { useGetVideos } from '@/api/videos';
import { VideoCard } from '@/components/VideoCard';
import { VideosSkeleton } from '@/components/VideosSkeleton';
import { ALLOWED_CATEGORIES_MAP } from '@/config';
import { capitalizeWords } from '@/utils/formatters';
import { parseInfiniteData } from '@/utils/parser';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { InView } from 'react-intersection-observer';

export const HomeContent = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useGetVideos({
    params: {
      search: search ?? category ?? undefined,
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
      {!isLoading && videos.length > 0 && (
        <h1 className="text-2xl font-bold text-accent-foreground">
          {search
            ? `Pesquisa por: ${search}`
            : category
              ? ALLOWED_CATEGORIES_MAP[category as keyof typeof ALLOWED_CATEGORIES_MAP]
              : 'Página Inicial'}
        </h1>
      )}
      <section
        className="grid auto-rows-auto gap-y-6 gap-x-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8"
        aria-label="Video grid"
      >
        {isLoading ? (
          <VideosSkeleton />
        ) : videos.length === 0 ? (
          <main className="flex col-span-full row-span-full flex-col items-center justify-center">
            <section className="text-center">
              <h1 className="text-2xl font-bold text-accent-foreground">
                Ops! Nenhum vídeo encontrado.
              </h1>
              <p className="text-sm text-muted-foreground">Tente procurar novamente.</p>
            </section>
          </main>
        ) : (
          <Fragment>
            {videos.map((video) => {
              const previewFile =
                video.video_files?.find((file) => file.quality === 'sd') || video.video_files?.[0];

              return (
                <VideoCard
                  key={video.id}
                  href={`/video/${video.id}`}
                  title={video.url}
                  duration={video.duration}
                  thumbnail={video.image}
                  author={capitalizeWords(video.user.name)}
                  videoUrl={previewFile?.link}
                />
              );
            })}

            <InView
              as="div"
              threshold={0}
              onChange={handleChangeLoader}
              className="col-span-full grid auto-rows-auto gap-y-6 gap-x-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8"
            >
              {isFetchingNextPage && <VideosSkeleton isResponsive />}
            </InView>
          </Fragment>
        )}
      </section>
    </main>
  );
};
