import { DefaultInfiniteQueryConfig } from '@/api/common/types';
import { Video } from '@/api/videos/types';
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';

export type PaginatedResponse = {
  page: number;
  per_page: number;
  total_results: number;
  videos: Video[];
};

type UseInfiniteQueryApiParams<TData extends PaginatedResponse, TParams = void> = {
  queryFn: (params: Partial<TParams> & { page: number }) => Promise<TData>;
  queryKey: readonly unknown[];
  queryConfig?: DefaultInfiniteQueryConfig<TData>;
  params?: TParams;
};

export const useInfiniteQueryApi = <TData extends PaginatedResponse, TParams = void>({
  queryFn,
  queryKey,
  queryConfig,
  params,
}: UseInfiniteQueryApiParams<TData, TParams>): UseInfiniteQueryResult<
  InfiniteData<TData, unknown>,
  Error
> =>
  useInfiniteQuery({
    queryKey: [...queryKey, params],
    queryFn: ({ pageParam = 1 }) =>
      queryFn({
        ...params,
        page: pageParam as number,
      } as TParams & { page: number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const maxPages = Math.ceil(lastPage.total_results / lastPage.per_page);
      const nextPage = lastPageParam + 1;
      const hasNextPage = nextPage + 1 <= maxPages;

      return hasNextPage ? nextPage : undefined;
    },
    ...queryConfig,
  });
