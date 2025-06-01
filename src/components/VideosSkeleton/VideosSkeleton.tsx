import { useMediaQuery } from '@/hooks';

type VideosSkeletonProps = {
  isResponsive?: boolean;
};

export const VideosSkeleton = ({ isResponsive = false }: VideosSkeletonProps) => {
  const [is4Cols, is3Cols, is2Cols] = useMediaQuery([
    '(min-width: 1280px)',
    '(min-width: 768px)',
    '(min-width: 640px)',
  ]);

  const cols = isResponsive ? (is4Cols ? 4 : is3Cols ? 3 : is2Cols ? 2 : 1) : 12;

  return (
    <>
      {Array.from({ length: cols }).map((_, index) => (
        <article
          key={index}
          className="cursor-default rounded-xl flex flex-col gap-2 w-full animate-pulse"
        >
          <div className="relative h-48 w-full dark:bg-muted bg-neutral-300 rounded-xl overflow-hidden" />

          <header className="flex flex-col px-2 gap-1">
            <div className="h-4 w-3/4 dark:bg-muted bg-neutral-300 rounded" />
            <div className="h-3 w-1/2 dark:bg-muted bg-neutral-300 rounded" />
          </header>
        </article>
      ))}
    </>
  );
};
