import { addToFavorites } from '@/api/actions';
import { DefaultMutationConfig } from '@/api/common/types';
import { useMutationApi } from '@/api/common/useMutationApi';
import { AddFavoriteParams, AddFavoriteResponse } from '../../types';

type useAddFavorite = {
  mutationConfig?: DefaultMutationConfig<AddFavoriteResponse, AddFavoriteParams>;
};

export const useAddFavorite = ({ mutationConfig }: useAddFavorite) =>
  useMutationApi<AddFavoriteResponse, AddFavoriteParams>({
    ...mutationConfig,
    mutationFn: ({ video }) => addToFavorites(video),
    mutationKey: ['add-favorite'],
  });
