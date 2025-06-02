export const PlaylistSkeleton = () => (
  <>
    {Array.from({ length: 4 }).map((_, index) => (
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
