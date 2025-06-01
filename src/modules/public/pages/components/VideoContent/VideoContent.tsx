/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { useGetPlaylistVideos, useGetVideoById } from '@/api/videos';
import { FavoriteButton } from '@/components/FavoriteButton';
import { PlayerSkeleton } from '@/components/PlayerSkeleton';
import { Playlist } from '@/components/Playlist';
import { ShareButton } from '@/components/ShareButton';
import { parseInfiniteData, parseTitle } from '@/utils/parser';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const VideoContent = () => {
  const router = useRouter();
  const { id } = useParams();

  const [autoplay, setAutoplay] = useState(false);

  const { data, isLoading } = useGetVideoById({
    params: { videoId: id as string },
  });

  const title = data?.url ? parseTitle(data?.url) : '';

  const {
    data: similarVideos,
    isLoading: isSimilarVideosLoading,
    fetchNextPage,
    isFetchingNextPage: isSimilarVideosFetchingNextPage,
  } = useGetPlaylistVideos({
    params: { search: title, videoId: id as string },
    queryConfig: {
      enabled: !!title,
    },
  });

  const videos = parseInfiniteData(similarVideos);

  const filteredVideos = videos.filter((v) => v.id !== data?.id);

  const file = data?.video_files.find((v) => v.quality === 'hd') || data?.video_files[0];

  const handleNextVideo = useCallback(() => {
    if (autoplay) {
      router.push(`/video/${filteredVideos?.[0]?.id}`);
    }
  }, [autoplay, router, filteredVideos]);

  const isSafari =
    typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main className="flex lg:flex-row flex-col gap-8 h-full w-full">
      {isLoading ? (
        <PlayerSkeleton />
      ) : (
        <article className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
          <div className="flex w-full rounded-xl overflow-hidden aspect-video bg-blue-200 shadow-sm">
            <video
              key={file?.link}
              src={file?.link}
              poster={data?.image}
              controls
              autoPlay={isSafari ? false : true}
              onEnded={handleNextVideo}
              className="rounded-xl w-full h-auto max-h-[80vh] object-cover"
            >
              <source src={file?.link} type="video/mp4" />
            </video>
          </div>
          <section className="flex gap-4 w-full h-fit px-4 py-6 items-start">
            <header className="flex flex-col w-full">
              <h1 className="text-2xl font-bold text-accent-foreground">{title}</h1>
              <p className="text-sm text-accent-foreground">{data?.user?.name}</p>
            </header>

            <nav className="flex gap-2 w-fit">
              <FavoriteButton />
              <ShareButton />
            </nav>
          </section>
        </article>
      )}

      <Playlist
        autoplay={autoplay}
        onChangeAutoplay={setAutoplay}
        videos={filteredVideos}
        isLoading={isSimilarVideosLoading}
        isFetchingNextPage={isSimilarVideosFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
};
