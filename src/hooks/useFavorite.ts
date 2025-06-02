import { Video } from '@/api/videos';
import { useAddFavorite, useRemoveFavorite } from '@/api/videos/mutations';
import { useGetIsVideoFavorite } from '@/api/videos/queries';
import { getIdFromUri } from '@/utils/functions';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFavorite = (video: Video) => {
  const queryClient = useQueryClient();

  const videoId = getIdFromUri(video.uri);

  const { data: isFavorite, refetch } = useGetIsVideoFavorite({
    params: { videoId },
  });

  const { mutate: addToFavorites } = useAddFavorite({});
  const { mutate: removeFromFavorites } = useRemoveFavorite({});

  const handleFavorite = () => {
    addToFavorites(
      { video },
      {
        onSuccess: async () => {
          toast.success('Vídeo adicionado aos favoritos');

          refetch();

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
      { videoId },
      {
        onSuccess: async () => {
          toast.success('Vídeo removido dos favoritos');

          refetch();

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
    isFavorite: isFavorite ?? false,
    handleFavorite,
    handleUnfavorite,
  };
};
