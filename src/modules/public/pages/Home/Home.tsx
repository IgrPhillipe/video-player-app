'use client';

import { VideoCard } from '@/components/VideoCard';

export const Home = () => (
  <div className="flex flex-1 flex-col gap-4 h-full w-full">
    <div className="grid auto-rows-auto gap-y-6 gap-x-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8">
      {Array.from({ length: 32 }).map((_, index) => (
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
);
