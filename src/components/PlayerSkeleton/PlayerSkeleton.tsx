import { Skeleton } from '../ui/skeleton';

export const PlayerSkeleton = () => (
  <article className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
    <div className="flex w-full rounded-xl overflow-hidden aspect-video bg-muted shadow-sm">
      <Skeleton className="w-full h-full rounded-xl" />
    </div>

    <section className="flex gap-4 w-full h-fit px-4 py-6 items-start">
      <header className="flex flex-col w-full gap-2">
        <Skeleton className="w-3/4 h-6 rounded-md" />
        <Skeleton className="w-1/3 h-4 rounded-md" />
      </header>

      <nav className="flex gap-2 w-fit">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </nav>
    </section>
  </article>
);
