import { getFavoriteVideos } from '@/api/actions';
import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { useInfiniteQueryApi } from '@/api/common/useInfiniteQueryApi';
import { GetFavoritesParams, GetFavoritesResponse } from '@/api/videos/types';

type useGetFavoritesProps = {
  params: GetFavoritesParams;
  queryConfig?: DefaultInfiniteQueryConfig<GetFavoritesResponse>;
};

export const useGetFavorites = ({ params, queryConfig }: useGetFavoritesProps) =>
  useInfiniteQueryApi<GetFavoritesResponse, GetFavoritesParams>({
    queryConfig,
    queryKey: ['favorite-videos', params.userId, params.search, params.fromVideoId],
    params,
    queryFn: getFavoriteVideos,
  });
