'use client';

import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { Switch } from '@/components/ui/switch';
import { VideoCard } from '@/components/VideoCard';

export const Video = () => (
  <div className="flex lg:flex-row flex-col gap-8 h-full w-full">
    <div className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
      <div className="flex w-full rounded-xl overflow-hidden aspect-video bg-blue-200 shadow-sm" />
      <div className="flex gap-4 w-full h-fit px-4 py-6 items-start">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-accent-foreground">Video Title</h1>
          <p className="text-sm text-accent-foreground">Video Description</p>
        </div>
        <div className="flex gap-2 w-fit">
          <FavoriteButton />
          <ShareButton />
        </div>
      </div>
    </div>

    <div className="flex lg:w-1/3 w-full lg:max-w-80 flex-col gap-6 h-full">
      <div className="rounded-xl h-12 text-accent-foreground bg-foreground w-full p-4 flex justify-between items-center">
        <p>Autoplay</p>
        <Switch />
      </div>

      <div className="flex flex-col gap-4 p-2 flex-1 w-full">
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
      </div>
    </div>
  </div>
);
