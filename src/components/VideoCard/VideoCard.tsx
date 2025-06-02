'use client';

import { Video } from '@/api/videos';
import { capitalizeWords, secondsToTimestamp } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';

type VideoCardProps = {
  video: Video;
  href: string;
};

export const VideoCard = ({ href, video }: VideoCardProps) => {
  const { name, user, duration, pictures } = video;

  const title = name;
  const author = capitalizeWords(user.name);
  const thumbnail = pictures.base_link;

  const durationLabel = secondsToTimestamp(duration);

  return (
    <Link href={href} className="block">
      <article className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full">
        <div className="relative h-48 w-full rounded-xl overflow-hidden group-hover:shadow-lg shadow-md animate">
          <Image src={thumbnail} alt={title} className="h-full w-full object-cover" fill />
          <span className="px-1 text-xs bg-black/70 rounded-full absolute bottom-2 right-2 text-white z-10">
            {durationLabel}
          </span>
        </div>
        <header className="flex flex-col px-2">
          <h3
            id={`video-title-${title}`}
            className="text-sm font-medium text-primary line-clamp-1 text-ellipsis group-hover:underline animate"
          >
            {title}
          </h3>
          <p
            className="text-sm text-muted-foreground line-clamp-1 text-ellipsis"
            aria-label={`Autor: ${author}`}
          >
            {author}
          </p>
        </header>
      </article>
    </Link>
  );
};
