import { DefaultQueryConfig } from '@/api/common/types';
import { useQueryApi } from '@/api/common/useQueryApi';
import { getVideoById } from '@/api/videos/requests';
import { GetVideoByIdParams, GetVideoByIdResponse } from '@/api/videos/types';

type UseGetVideoByIdProps = {
  params: GetVideoByIdParams;
  queryConfig?: DefaultQueryConfig<GetVideoByIdResponse>;
};

export const useGetVideoById = ({ params, queryConfig }: UseGetVideoByIdProps) =>
  useQueryApi<GetVideoByIdResponse, GetVideoByIdParams>({
    queryKey: ['video-by-id', params.videoId],
    queryFn: getVideoById,
    params,
    queryConfig,
  });
