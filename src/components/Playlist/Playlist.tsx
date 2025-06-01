import { Video } from '@/api/videos';
import { Switch } from '@/components/ui/switch';
import { VideoCard } from '@/components/VideoCard';
import { capitalizeWords } from '@/utils/formatters';
import { parseTitle } from '@/utils/parser';
import { Dispatch, SetStateAction } from 'react';
import { InView } from 'react-intersection-observer';
import { PlaylistSkeleton } from '../PlaylistSkeleton';

type PlaylistProps = {
  autoplay: boolean;
  onChangeAutoplay: Dispatch<SetStateAction<boolean>>;
  videos: Video[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export const Playlist = ({
  autoplay,
  onChangeAutoplay,
  videos,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
}: PlaylistProps) => {
  const handleChangeLoader = (inView: boolean) => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  };

  return (
    <aside className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-4 h-full">
      <section className="rounded-xl h-12 text-accent-foreground bg-foreground w-full p-4 flex justify-between items-center">
        <label htmlFor="autoplay" className="cursor-pointer">
          Reprodução automática
        </label>
        <Switch id="autoplay" checked={autoplay} onCheckedChange={onChangeAutoplay} />
      </section>

      {isLoading ? (
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 p-2 flex-1 w-full">
            <PlaylistSkeleton />
          </div>
        </section>
      ) : videos.length > 0 ? (
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 p-2 flex-1 w-full">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              videos.map((video) => {
                const previewFile =
                  video.video_files?.find((file) => file.quality === 'sd') ||
                  video.video_files?.[0];

                return (
                  <VideoCard
                    key={video.id}
                    href={`/video/${video.id}`}
                    title={parseTitle(video.url)}
                    duration={video.duration}
                    thumbnail={video.image}
                    author={capitalizeWords(video.user.name)}
                    videoUrl={previewFile?.link}
                  />
                );
              })
            )}

            <InView
              as="div"
              threshold={0}
              onChange={handleChangeLoader}
              className="flex flex-col gap-4 flex-1 w-full"
            >
              {isFetchingNextPage && <PlaylistSkeleton />}
            </InView>
          </div>
        </section>
      ) : (
        <></>
      )}
    </aside>
  );
};
