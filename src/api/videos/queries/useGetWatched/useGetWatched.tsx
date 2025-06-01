import { getWatchedVideos } from '@/api/actions';
import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import { GetFavoritesParams, GetFavoritesResponse } from '@/api/videos/types';

type useGetWatchedProps = {
  params: GetFavoritesParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetFavoritesResponse>;
};

export const useGetWatched = ({ params, queryConfig }: useGetWatchedProps) =>
  useInfiniteQueryApi<GetFavoritesResponse, GetFavoritesParams>({
    ...queryConfig,
    queryKey: ['watched-videos', params.userId, params.search, params.fromVideoId],
    params,
    queryFn: getWatchedVideos,
  });
