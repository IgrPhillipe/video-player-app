import { DefaultQueryConfig } from '@/api/common/types';
import { useQueryApi } from '@/api/common/useQueryApi';
import { getVideoById } from '@/api/videos/requests';
import { GetVideoByIdParams, GetVideoByIdResponse } from '@/api/videos/types';

type UseGetVideoByIdProps = {
  params: GetVideoByIdParams;
  queryConfig?: DefaultQueryConfig<GetVideoByIdResponse>;
};

export const generateGetVideoByIdQueryKey = (params: GetVideoByIdParams) => [
  'video-by-id',
  params.videoId,
];

export const useGetVideoById = ({ params, queryConfig }: UseGetVideoByIdProps) =>
  useQueryApi<GetVideoByIdResponse, GetVideoByIdParams>({
    queryKey: generateGetVideoByIdQueryKey(params),
    queryFn: getVideoById,
    params,
    queryConfig,
  });
