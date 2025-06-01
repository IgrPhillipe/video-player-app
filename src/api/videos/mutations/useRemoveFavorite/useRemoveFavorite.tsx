import { removeFromFavorites } from '@/api/actions';
import { DefaultMutationConfig } from '@/api/common/types';
import { useMutationApi } from '@/api/common/useMutationApi';
import { RemoveFavoriteParams, RemoveFavoriteResponse } from '../../types';

type useRemoveFavorite = {
  mutationConfig?: DefaultMutationConfig<RemoveFavoriteResponse, RemoveFavoriteParams>;
};

export const useRemoveFavorite = ({ mutationConfig }: useRemoveFavorite) =>
  useMutationApi<RemoveFavoriteResponse, RemoveFavoriteParams>({
    ...mutationConfig,
    mutationFn: ({ videoId }) => removeFromFavorites(videoId),
    mutationKey: ['remove-favorite'],
  });
