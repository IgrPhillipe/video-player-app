import { Video } from '@/api/videos';
import { CustomHeartIcon } from '@/components/ui/custom-heart';
import { useFavorite } from '@/hooks/useFavorite';
import { cn } from '@/lib/utils';
import { CustomIconHandle } from '@/types';
import { useRef } from 'react';

type FavoriteButtonProps = {
  video: Video;
};

export const FavoriteButton = ({ video }: FavoriteButtonProps) => {
  const iconRef = useRef<CustomIconHandle>(null);
  const { isFavorite, handleFavorite, handleUnfavorite } = useFavorite(video);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  return (
    <button
      className="p-2 flex items-center justify-center rounded-full bg-neutral-200 aspect-square group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isFavorite ? handleUnfavorite : handleFavorite}
    >
      <CustomHeartIcon
        ref={iconRef}
        size={20}
        className={cn(
          'group-hover:text-red-500 animate group-hover:fill-red-500 text-neutral-500 fill-neutral-500',
          isFavorite && 'text-red-500 fill-red-500',
        )}
      />
    </button>
  );
};
