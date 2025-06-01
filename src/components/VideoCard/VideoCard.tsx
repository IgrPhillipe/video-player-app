'use client';

import { useVideoPreview } from '@/hooks/useVideoPreview';
import { capitalizeWords, secondsToTimestamp } from '@/utils/formatters';
import { parseTitle } from '@/utils/parser';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

type VideoCardProps = {
  href: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
};

export const VideoCard = memo(
  ({ href, title, author, duration, thumbnail, videoUrl }: VideoCardProps) => {
    const {
      showVideo,
      videoRef,
      handleMouseEnter,
      handleMouseLeave,
      handleTouchStart,
      handleTouchEnd,
      internalDuration,
    } = useVideoPreview(videoUrl, duration);

    const durationLabel = internalDuration
      ? secondsToTimestamp(internalDuration)
      : secondsToTimestamp(duration);

    return (
      <Link
        href={href}
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <article className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full">
          <div className="relative h-48 w-full rounded-xl overflow-hidden group-hover:shadow-lg shadow-md animate">
            {showVideo ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="h-full w-full object-cover"
                muted
                playsInline
              />
            ) : (
              <Image src={thumbnail} alt={title} className="h-full w-full object-cover" fill />
            )}
            <span className="px-1 text-xs bg-black/70 rounded-full absolute bottom-2 right-2 text-white z-10">
              {durationLabel}
            </span>
          </div>
          <header className="flex flex-col px-2">
            <h3
              id={`video-title-${title}`}
              className="line-clamp-2 text-sm font-medium text-neutral-900"
            >
              {capitalizeWords(parseTitle(title))}
            </h3>
            <p className="text-xs text-neutral-500" aria-label={`Autor: ${author}`}>
              {author}
            </p>
          </header>
        </article>
      </Link>
    );
  },
);

VideoCard.displayName = 'VideoCard';
