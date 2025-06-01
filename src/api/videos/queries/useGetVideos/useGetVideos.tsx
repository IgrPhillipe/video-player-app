import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import { getVideos } from '@/api/videos/requests';
import { GetVideosParams, GetVideosResponse } from '@/api/videos/types';

type UseGetPlaylistVideosProps = {
  params?: GetVideosParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetVideosResponse>;
};

export const useGetPlaylistVideos = ({ params, queryConfig }: UseGetPlaylistVideosProps) =>
  useInfiniteQueryApi<GetVideosResponse, GetVideosParams>({
    queryKey: ['playlist-videos', params?.search, params?.videoId],
    params,
    queryFn: getVideos,
    queryConfig,
  });
