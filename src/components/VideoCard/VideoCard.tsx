'use client';

import { cn } from '@/lib/utils';
import { secondsToTimestamp } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

type VideoCardProps = {
  href: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
  videoUrl?: string;
};

export const VideoCard = memo(
  ({ href, title, author, duration, thumbnail, videoUrl }: VideoCardProps) => {
    const [showVideo, setShowVideo] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [internalDuration, setInternalDuration] = useState(duration);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const isHoveredRef = useRef(false);

    const handleMouseEnter = useCallback(() => {
      isHoveredRef.current = true;

      hoverTimeoutRef.current = setTimeout(() => {
        if (videoUrl && isHoveredRef.current) {
          setShowVideo(true);
        }
      }, 2000);
    }, [videoUrl]);

    const handleMouseLeave = useCallback(() => {
      isHoveredRef.current = false;
      setShowVideo(false);

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, []);

    const handleTouchStart = useCallback(() => {
      isHoveredRef.current = true;

      if (videoUrl) {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }
    }, [videoUrl]);

    const handleTouchEnd = useCallback(() => {
      isHoveredRef.current = false;
      setShowVideo(false);

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, []);

    useEffect(() => {
      if (showVideo && videoRef.current) {
        videoRef.current.play();
      }
    }, [showVideo]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.addEventListener('timeupdate', () => {
          setInternalDuration(duration - (videoRef.current?.currentTime || 0) + 1);
        });
      }
    }, [duration]);

    return (
      <Link
        href={href}
        key={title}
        className="block"
        aria-label={`Assistir vídeo: ${title} por ${author}`}
      >
        <article
          className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full"
          aria-labelledby={`video-title-${title}`}
        >
          <div
            className="relative h-48 w-full rounded-xl overflow-hidden group-hover:shadow-lg shadow-md animate"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={thumbnail}
              alt={`Thumbnail do vídeo: ${title}`}
              fill
              loading="lazy"
              className={cn(
                'object-cover transition-opacity duration-300',
                showVideo ? 'opacity-0' : 'opacity-100',
              )}
            />

            {videoUrl && (
              <video
                ref={videoRef}
                src={videoUrl}
                muted
                loop
                playsInline
                aria-hidden={!showVideo}
                className={cn(
                  'absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300',
                  showVideo ? 'opacity-100' : 'opacity-0',
                )}
              />
            )}

            <time
              className="px-1 text-xs bg-black/70 rounded-full absolute bottom-2 right-2 text-white z-10"
              dateTime={`PT${internalDuration || duration}S`}
              aria-label={`Duração do vídeo: ${secondsToTimestamp(internalDuration || duration)}`}
            >
              {internalDuration
                ? secondsToTimestamp(internalDuration)
                : secondsToTimestamp(duration)}
            </time>
          </div>

          <header className="flex flex-col px-2">
            <h3
              ref={titleRef}
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
  },
);

VideoCard.displayName = 'VideoCard';
