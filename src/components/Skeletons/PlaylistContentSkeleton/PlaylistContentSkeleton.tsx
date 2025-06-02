import { PlaylistSkeleton } from '@/components/Skeletons';

export const PlaylistContentSkeleton = () => (
  <aside className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-4 h-full">
    <section className="rounded-xl h-12 bg-muted w-full p-4 animate-pulse" />
    <section className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 p-2 flex-1 w-full">
        <PlaylistSkeleton />
      </div>
    </section>
  </aside>
);
