/* eslint-disable jsx-a11y/media-has-caption */
import { Video } from '@/api/videos';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { parseTitle } from '@/utils/parser';

type VideoPlayerProps = {
  video: Video;
  handleNextVideo: () => void;
};

export const VideoPlayer = ({ video, handleNextVideo }: VideoPlayerProps) => {
  const isSafari =
    typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const title = parseTitle(video.url);

  const file = video.video_files.find((v) => v.quality === 'hd') || video.video_files[0];

  return (
    <article className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
      <div className="flex w-full rounded-xl overflow-hidden aspect-video bg-blue-200 shadow-sm">
        <video
          key={file?.link}
          src={file?.link}
          poster={video?.image}
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
