import { isAutoplayEnabled } from '@/api/actions';
import { DefaultQueryConfig } from '@/api/common/types';
import { useQueryApi } from '@/api/common/useQueryApi';
import { GetIsAutoplayEnabledParams, GetIsAutoplayEnabledResponse } from '@/api/videos/types';

type UseGetIsAutoplayEnabledProps = {
  params: GetIsAutoplayEnabledParams;
  queryConfig?: DefaultQueryConfig<GetIsAutoplayEnabledResponse>;
};

export const generateGetIsAutoplayEnabledQueryKey = (
  params: Partial<GetIsAutoplayEnabledParams>,
) => ['is-autoplay-enabled', params.userId];

export const useGetIsAutoplayEnabled = ({ params, queryConfig }: UseGetIsAutoplayEnabledProps) =>
  useQueryApi<GetIsAutoplayEnabledResponse, GetIsAutoplayEnabledParams>({
    queryKey: generateGetIsAutoplayEnabledQueryKey(params),
    params,
    queryFn: isAutoplayEnabled,
    queryConfig,
  });
