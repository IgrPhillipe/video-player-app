'use client';

import Link from 'next/link';

export const Home = () => (
  <div className="flex flex-1 flex-col gap-4 h-full w-full">
    <div className="grid auto-rows-auto gap-y-6 gap-x-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8">
      {Array.from({ length: 32 }).map((_, index) => (
        <Link href={`/${index}`} key={index}>
          <div className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full">
            <div className="relative h-48 w-full bg-neutral-900 rounded-xl overflow-hidden group-hover:shadow-md animate">
              {/* <Image
                src="/images/placeholder.png"
                alt="Placeholder"
                fill
                className="object-cover"
              /> */}
              <div className="px-1 text-xs bg-white/50 rounded-full absolute bottom-2 right-2">
                <small>00:15</small>
              </div>
            </div>

            <div className="flex flex-col px-2">
              <p className="text-sm font-medium text-primary line-clamp-1 text-ellipsis group-hover:underline">
                Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet
                consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">
                Lorem ipsum dolor
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
