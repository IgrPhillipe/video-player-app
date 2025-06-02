import { Video } from '@/api/videos';
import { NoVideosResult } from '@/components/NoVideosResult';
import { VideosSkeleton } from '@/components/Skeletons';
import { VideoCard } from '@/components/VideoCard';
import { getIdFromUri } from '@/utils/functions';
import { Fragment, ReactNode } from 'react';

type BaseVideoGridProps = {
  items: Video[];
  isLoading: boolean;
  children: ReactNode;
  title: string;
  cardLinkBasePath: string;
};

export const BaseVideoGrid = ({
  items,
  isLoading,
  children,
  title,
  cardLinkBasePath,
}: BaseVideoGridProps) => {
  const count = items.length;
  const hasResults = count > 0;

  return (
    <main className="flex flex-1 flex-col gap-4 h-full w-full">
      {!isLoading && hasResults && (
        <h1 className="text-2xl font-bold text-accent-foreground">{title}</h1>
      )}

      <section
        className="grid auto-rows-auto gap-y-6 gap-x-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8"
        aria-label="Video grid"
      >
        {isLoading ? (
          <VideosSkeleton />
        ) : !hasResults ? (
          <NoVideosResult />
        ) : (
          <Fragment>
            {items.map((video) => {
              const itemId = getIdFromUri(video.uri);
              return (
                <VideoCard key={video.uri} href={`${cardLinkBasePath}/${itemId}`} video={video} />
              );
            })}

            {children}
          </Fragment>
        )}
      </section>
    </main>
  );
};
