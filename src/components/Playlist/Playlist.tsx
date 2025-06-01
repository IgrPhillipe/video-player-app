import { Video } from '@/api/videos';
import { Switch } from '@/components/ui/switch';
import { VideoCard } from '@/components/VideoCard';
import { parseVideoTitle } from '@/utils/parser';
import { Dispatch, SetStateAction } from 'react';
import { InView } from 'react-intersection-observer';

type PlaylistProps = {
  autoplay: boolean;
  onChangeAutoplay: Dispatch<SetStateAction<boolean>>;
  videos: Video[];
  isLoading: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
};

export const Playlist = ({
  autoplay,
  onChangeAutoplay,
  videos,
  isLoading,
  isFetching,
  fetchNextPage,
}: PlaylistProps) => {
  const handleChangeLoader = (inView: boolean) => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  };

  return (
    <aside className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-6 h-full">
      <section className="rounded-xl h-12 text-accent-foreground bg-foreground w-full p-4 flex justify-between items-center">
        <label htmlFor="autoplay" className="cursor-pointer">
          Autoplay
        </label>
        <Switch id="autoplay" checked={autoplay} onCheckedChange={onChangeAutoplay} />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium text-sidebar-foreground/70">Veja também</p>

        <div className="flex flex-col gap-4 p-2 flex-1 w-full">
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
        </div>
      </section>
    </aside>
  );
};
