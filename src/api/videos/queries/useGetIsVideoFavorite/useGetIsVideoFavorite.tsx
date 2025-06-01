import { isVideoFavorite } from '@/api/actions';
import { DefaultQueryConfig } from '@/api/common/types';
import { useQueryApi } from '@/api/common/useQueryApi';
import { GetIsVideoFavoriteParams, GetIsVideoFavoriteResponse } from '@/api/videos/types';

type UseGetIsVideoFavoriteProps = {
  params: GetIsVideoFavoriteParams;
  queryConfig?: DefaultQueryConfig<GetIsVideoFavoriteResponse>;
};

export const useGetIsVideoFavorite = ({ params, queryConfig }: UseGetIsVideoFavoriteProps) =>
  useQueryApi<GetIsVideoFavoriteResponse, GetIsVideoFavoriteParams>({
    queryKey: ['is-video-favorite', params?.videoId],
    params,
    queryFn: () => isVideoFavorite(params.videoId),
    queryConfig,
  });
