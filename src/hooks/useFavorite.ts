import { Video } from '@/api/videos';
import { useAddFavorite, useRemoveFavorite } from '@/api/videos/mutations';
import {
  generateGetFavoritesQueryKey,
  generateGetIsVideoFavoriteQueryKey,
  useGetIsVideoFavorite,
} from '@/api/videos/queries';
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

          const favoriteVideosQueryKey = generateGetFavoritesQueryKey({});
          const isVideoFavoriteQueryKey = generateGetIsVideoFavoriteQueryKey({});

          await queryClient.invalidateQueries({
            queryKey: isVideoFavoriteQueryKey,
            refetchType: 'all',
          });

          await queryClient.invalidateQueries({
            queryKey: favoriteVideosQueryKey,
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

          const favoriteVideosQueryKey = generateGetFavoritesQueryKey({});
          const isVideoFavoriteQueryKey = generateGetIsVideoFavoriteQueryKey({});

          await queryClient.invalidateQueries({
            queryKey: isVideoFavoriteQueryKey,
            refetchType: 'all',
          });

          await queryClient.invalidateQueries({
            queryKey: favoriteVideosQueryKey,
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
