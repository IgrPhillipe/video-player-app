import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import { getVideos } from '@/api/videos/requests';
import { GetVideosParams, GetVideosResponse } from '@/api/videos/types';

type UseGetVideosProps = {
  params?: GetVideosParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetVideosResponse>;
};

export const useGetVideos = ({ params, queryConfig }: UseGetVideosProps) =>
  useInfiniteQueryApi<GetVideosResponse, GetVideosParams>({
    ...queryConfig,
    queryKey: ['videos', params?.search],
    params,
    queryFn: getVideos,
  });
