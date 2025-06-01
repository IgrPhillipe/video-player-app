import { secondsToTimestamp } from '@/utils/formatters';
import Image from 'next/image';
import Link from 'next/link';

type VideoCardProps = {
  href: string;
  title: string;
  author: string;
  duration: number;
  thumbnail: string;
};

export const VideoCard = ({ href, title, author, duration, thumbnail }: VideoCardProps) => (
  <Link href={href} key={title}>
    <article className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full">
      <div className="relative h-48 w-full bg-neutral-900 rounded-xl overflow-hidden group-hover:shadow-md animate">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <time className="px-1 text-xs bg-black/70 rounded-full absolute bottom-2 right-2">
          {secondsToTimestamp(duration)}
        </time>
      </div>

      <header className="flex flex-col px-2">
        <h3 className="text-sm font-medium text-primary line-clamp-1 text-ellipsis group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">{author}</p>
      </header>
    </article>
  </Link>
);
