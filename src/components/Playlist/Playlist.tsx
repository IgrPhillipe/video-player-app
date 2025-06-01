import { Switch } from '@/components/ui/switch';
import { VideoCard } from '@/components/VideoCard';

export const Playlist = () => (
  <aside className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-6 h-full">
    <section className="rounded-xl h-12 text-accent-foreground bg-foreground w-full p-4 flex justify-between items-center">
      <label htmlFor="autoplay" className="cursor-pointer">
        Autoplay
      </label>
      <Switch id="autoplay" />
    </section>

    <section className="flex flex-col gap-4 p-2 flex-1 w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <VideoCard
          key={index}
          href={`/video/${index}`}
          title="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          duration="00:15"
          thumbnail="https://via.placeholder.com/150"
          author="John Doe"
        />
      ))}
    </section>
  </aside>
);
