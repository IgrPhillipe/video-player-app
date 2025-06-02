import { generateGetIsAutoplayEnabledQueryKey, Video } from '@/api/videos';
import { useEnableAutoplay } from '@/api/videos/mutations';
import { PlaylistContentSkeleton, PlaylistSkeleton } from '@/components/Skeletons';
import { Switch } from '@/components/ui/switch';
import { VideoCard } from '@/components/VideoCard';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { InfiniteScrollObserver } from '../InfiniteScrollObserver';

type PlaylistProps = {
  videos: Video[];
  isFetchingNextPage: boolean;
  fetchNextPage?: () => void;
  isAutoplayEnabled: boolean;
  userId: string;
  isLoading: boolean;
};

export const Playlist = ({
  videos,
  isFetchingNextPage,
  fetchNextPage,
  isAutoplayEnabled,
  userId,
  isLoading,
}: PlaylistProps) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const isFavoritesPage = pathname.startsWith('/favoritos');
  const isWatchedPage = pathname.startsWith('/assistidos');

  const { mutate: setAutoplayEnabled } = useEnableAutoplay({});

  const handleChangeAutoplay = (checked: boolean) => {
    setAutoplayEnabled(
      { userId, enabled: checked },
      {
        onSuccess: async () => {
          const queryKey = generateGetIsAutoplayEnabledQueryKey({ userId });

          await queryClient.invalidateQueries({
            queryKey,
            refetchType: 'all',
          });
        },
      },
    );
  };

  const favoritesPageBasePath = `/favoritos/video`;
  const watchedPageBasePath = `/assistidos/video`;
  const videoBasePath = `/video`;

  const videoHref = (videoId: number) => {
    if (isFavoritesPage) return `${favoritesPageBasePath}/${videoId}`;
    if (isWatchedPage) return `${watchedPageBasePath}/${videoId}`;
    return `${videoBasePath}/${videoId}`;
  };

  if (isLoading) {
    return <PlaylistContentSkeleton />;
  }

  return (
    <aside className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-4 h-full">
      <section className="rounded-xl h-12 text-accent-foreground bg-foreground w-full p-4 flex justify-between items-center">
        <label htmlFor="autoplay" className="cursor-pointer text-xs">
          Reprodução automática
        </label>
        <Switch id="autoplay" checked={isAutoplayEnabled} onCheckedChange={handleChangeAutoplay} />
      </section>

      {videos.length > 0 ? (
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 py-2 flex-1 w-full">
            {videos.map((video) => (
              <VideoCard key={video.id} href={videoHref(video.id)} video={video} />
            ))}

            <InfiniteScrollObserver
              isLoading={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              className="flex flex-col w-full"
            >
              <PlaylistSkeleton />
            </InfiniteScrollObserver>
          </div>
        </section>
      ) : (
        <></>
      )}
    </aside>
  );
};
