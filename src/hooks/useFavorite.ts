import { Video } from '@/api/videos';
import { useAddFavorite, useRemoveFavorite } from '@/api/videos/mutations';
import { useGetIsVideoFavorite } from '@/api/videos/queries/useGetIsVideoFavorite';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFavorite = (video: Video) => {
  const queryClient = useQueryClient();

  const { data: isFavorite } = useGetIsVideoFavorite({
    params: { videoId: video.id },
  });

  const { mutate: addToFavorites } = useAddFavorite({});
  const { mutate: removeFromFavorites } = useRemoveFavorite({});

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

  return {
    isFavorite,
    handleFavorite,
    handleUnfavorite,
  };
};
