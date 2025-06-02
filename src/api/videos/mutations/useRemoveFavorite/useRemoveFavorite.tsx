import { removeFromFavorites } from '@/api/actions';
import { useMutationApi } from '@/api/common';
import { DefaultMutationConfig } from '@/api/common/types';
import { RemoveFavoriteParams, RemoveFavoriteResponse } from '@/api/videos/types';

type useRemoveFavorite = {
  mutationConfig?: DefaultMutationConfig<RemoveFavoriteResponse, RemoveFavoriteParams>;
};

export const useRemoveFavorite = ({ mutationConfig }: useRemoveFavorite) =>
  useMutationApi<RemoveFavoriteResponse, RemoveFavoriteParams>({
    ...mutationConfig,
    mutationFn: ({ videoId }) => removeFromFavorites(videoId),
    mutationKey: ['remove-favorite'],
  });
