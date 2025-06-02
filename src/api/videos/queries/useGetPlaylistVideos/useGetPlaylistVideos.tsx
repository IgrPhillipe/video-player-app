import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import { getRelatedVideos } from '@/api/videos/requests';
import { GetVideosParams, GetVideosResponse } from '@/api/videos/types';

type UseGetPlaylistVideosProps = {
  params?: GetVideosParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetVideosResponse>;
};

export const generateGetPlaylistVideosQueryKey = (params: Partial<GetVideosParams> | undefined) => [
  'playlist-videos',
  params?.search,
];

export const useGetPlaylistVideos = ({ params, queryConfig }: UseGetPlaylistVideosProps) =>
  useInfiniteQueryApi<GetVideosResponse, GetVideosParams>({
    ...queryConfig,
    queryKey: generateGetPlaylistVideosQueryKey(params),
    params,
    queryFn: getRelatedVideos,
  });
