import { setAutoplayEnabled } from '@/api/actions';
import { useMutationApi } from '@/api/common';
import { DefaultMutationConfig } from '@/api/common/types';
import { EnableAutoplayParams, EnableAutoplayResponse } from '@/api/videos/types';

type useEnableAutoplay = {
  mutationConfig?: DefaultMutationConfig<EnableAutoplayResponse, EnableAutoplayParams>;
};

export const useEnableAutoplay = ({ mutationConfig }: useEnableAutoplay) =>
  useMutationApi<EnableAutoplayResponse, EnableAutoplayParams>({
    ...mutationConfig,
    mutationFn: ({ enabled }) => setAutoplayEnabled(enabled),
    mutationKey: ['enable-autoplay'],
  });
