import { getWatchedVideos } from '@/api/actions';
import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import {
  GetFavoritesParams,
  GetFavoritesResponse,
  GetWatchedParams,
  GetWatchedResponse,
} from '@/api/videos/types';

type useGetWatchedProps = {
  params: GetFavoritesParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetFavoritesResponse>;
};

export const generateGetWatchedQueryKey = (params: Partial<GetWatchedParams>) => [
  'watched-videos',
  params.userId,
  params.search,
];

export const useGetWatched = ({ params, queryConfig }: useGetWatchedProps) =>
  useInfiniteQueryApi<GetWatchedResponse, GetWatchedParams>({
    ...queryConfig,
    queryKey: generateGetWatchedQueryKey(params),
    params,
    queryFn: getWatchedVideos,
  });
