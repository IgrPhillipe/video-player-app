import { Video } from '@/api/videos';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { useVimeoPlayer } from '@/hooks/useVimeoPlayer';

type VideoPlayerProps = {
  video: Video;
  handleNextVideo: () => void;
  autoplay?: boolean;
};

export const VideoPlayer = ({ video, handleNextVideo, autoplay = false }: VideoPlayerProps) => {
  const { iframeRef, iframeUrl } = useVimeoPlayer({
    videoUri: video.uri,
    onVideoEnd: handleNextVideo,
    autoplay,
    embedUrl: video.player_embed_url,
  });

  const title = video.name;

  const aspectRatio = video.width && video.height ? (video.height / video.width) * 100 : 56.25;

  return (
    <article className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      </div>

      <section className="flex gap-4 w-full h-fit px-4 py-6 items-start">
        <header className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-accent-foreground">{title}</h1>
          <p className="text-sm text-accent-foreground">{video.user?.name}</p>
        </header>

        <nav className="flex gap-2 w-fit">
          <FavoriteButton video={video} />
          <ShareButton />
        </nav>
      </section>
    </article>
  );
};
