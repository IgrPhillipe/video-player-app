'use client';

import { FavoriteButton } from '@/components/FavoriteButton';
import { Playlist } from '@/components/Playlist';
import { ShareButton } from '@/components/ShareButton';

export const Video = () => (
  <main className="flex lg:flex-row flex-col gap-8 h-full w-full">
    <article className="flex flex-col lg:sticky top-6 w-full bg-foreground rounded-xl h-fit">
      <div className="flex w-full rounded-xl overflow-hidden aspect-video bg-blue-200 shadow-sm" />
      <section className="flex gap-4 w-full h-fit px-4 py-6 items-start">
        <header className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-accent-foreground">Video Title</h1>
          <p className="text-sm text-accent-foreground">Video Description</p>
        </header>
        <nav className="flex gap-2 w-fit">
          <FavoriteButton />
          <ShareButton />
        </nav>
      </section>
    </article>

    <Playlist />
  </main>
);
