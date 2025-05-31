import Link from 'next/link';

type VideoCardProps = {
  href: string;
  title: string;
  duration: string;
  thumbnail: string;
  author: string;
};

export const VideoCard = ({ href, title, duration, thumbnail, author }: VideoCardProps) => (
  <Link href={href} key={title}>
    <div className="cursor-pointer rounded-xl flex flex-col gap-2 group w-full">
      <div className="relative h-48 w-full bg-neutral-900 rounded-xl overflow-hidden group-hover:shadow-md animate">
        {/* <Image
                src="/images/placeholder.png"
                alt="Placeholder"
                fill
                className="object-cover"
              /> */}
        <div className="px-1 text-xs bg-white/50 rounded-full absolute bottom-2 right-2">
          <small>{duration}</small>
        </div>
      </div>

      <div className="flex flex-col px-2">
        <p className="text-sm font-medium text-primary line-clamp-1 text-ellipsis group-hover:underline">
          {title}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-1 text-ellipsis">{author}</p>
      </div>
    </div>
  </Link>
);
