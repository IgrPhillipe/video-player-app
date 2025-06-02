import { addToFavorites } from '@/api/actions';
import { useMutationApi } from '@/api/common';
import { DefaultMutationConfig } from '@/api/common/types';
import { AddFavoriteParams, AddFavoriteResponse } from '@/api/videos/types';

type useAddFavorite = {
  mutationConfig?: DefaultMutationConfig<AddFavoriteResponse, AddFavoriteParams>;
};

export const useAddFavorite = ({ mutationConfig }: useAddFavorite) =>
  useMutationApi<AddFavoriteResponse, AddFavoriteParams>({
    ...mutationConfig,
    mutationFn: ({ video }) => addToFavorites(video),
    mutationKey: ['add-favorite'],
  });
