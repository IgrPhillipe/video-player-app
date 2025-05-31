import { CustomHeartIcon } from '@/components/ui/custom-heart';
import { useRef } from 'react';

export const FavoriteButton = () => {
  const iconRef = useRef<any>(null);

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
    >
      <CustomHeartIcon
        ref={iconRef}
        size={20}
        className="group-hover:text-red-500 animate group-hover:fill-red-500 text-neutral-500 fill-neutral-500"
      />
    </button>
  );
};
