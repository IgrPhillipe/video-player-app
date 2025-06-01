import { addToWatched } from '@/api/actions';
import { DefaultMutationConfig } from '@/api/common/types';
import { useMutationApi } from '@/api/common/useMutationApi';
import { AddWatchedParams, AddWatchedResponse } from '../../types';

type UseAddWatchedProps = {
  mutationConfig?: DefaultMutationConfig<AddWatchedResponse, AddWatchedParams>;
};

export const useAddWatched = ({ mutationConfig }: UseAddWatchedProps) =>
  useMutationApi<AddWatchedResponse, AddWatchedParams>({
    ...mutationConfig,
    mutationFn: ({ video }) => addToWatched(video),
    mutationKey: ['add-watched'],
  });
