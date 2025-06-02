import { addToWatched } from '@/api/actions';
import { useMutationApi } from '@/api/common';
import { DefaultMutationConfig } from '@/api/common/types';
import { AddWatchedParams, AddWatchedResponse } from '@/api/videos/types';

type UseAddWatchedProps = {
  mutationConfig?: DefaultMutationConfig<AddWatchedResponse, AddWatchedParams>;
};

export const useAddWatched = ({ mutationConfig }: UseAddWatchedProps) =>
  useMutationApi<AddWatchedResponse, AddWatchedParams>({
    ...mutationConfig,
    mutationFn: ({ video }) => addToWatched(video),
    mutationKey: ['add-watched'],
  });
