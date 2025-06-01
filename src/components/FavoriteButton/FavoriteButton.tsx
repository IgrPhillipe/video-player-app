import { Video } from '@/api/videos';
import { useAddFavorite, useRemoveFavorite } from '@/api/videos/mutations';
import { useGetIsVideoFavorite } from '@/api/videos/queries/useGetIsVideoFavorite';
import { CustomHeartIcon } from '@/components/ui/custom-heart';
import { cn } from '@/lib/utils';
import { CustomIconHandle } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'sonner';

type FavoriteButtonProps = {
  video: Video;
};

export const FavoriteButton = ({ video }: FavoriteButtonProps) => {
  const iconRef = useRef<CustomIconHandle>(null);
  const queryClient = useQueryClient();

  const { data: isFavorite } = useGetIsVideoFavorite({
    params: { videoId: video.id },
  });

  const { mutate: addToFavorites } = useAddFavorite({});
  const { mutate: removeFromFavorites } = useRemoveFavorite({});

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  const handleFavorite = () => {
    addToFavorites(
      { video },
      {
        onSuccess: async () => {
          toast.success('Vídeo adicionado aos favoritos');
          await queryClient.invalidateQueries({
            queryKey: ['is-video-favorite'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['favorite-videos'],
            refetchType: 'all',
          });
        },
        onError: () => toast.error('Erro ao adicionar vídeo aos favoritos'),
      },
    );
  };

  const handleUnfavorite = () => {
    removeFromFavorites(
      { videoId: video.id },
      {
        onSuccess: async () => {
          toast.success('Vídeo removido dos favoritos');
          await queryClient.invalidateQueries({
            queryKey: ['is-video-favorite'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['favorite-videos'],
            refetchType: 'all',
          });
        },
        onError: () => toast.error('Erro ao remover vídeo dos favoritos'),
      },
    );
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
