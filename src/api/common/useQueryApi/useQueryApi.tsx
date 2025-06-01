import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DefaultQueryConfig, QueryFn } from '../types';

type UseQueryApiParams<TData, TParams = void> = {
  queryFn: QueryFn<TData, TParams>;
  queryKey: readonly unknown[];
  queryConfig?: DefaultQueryConfig<TData>;
  params: TParams;
};

export const useQueryApi = <TData, TParams = void>({
  queryFn,
  queryKey,
  queryConfig,
  params,
}: UseQueryApiParams<TData, TParams>): UseQueryResult<TData, Error> =>
  useQuery({
    ...queryConfig,
    queryKey: [...queryKey, params],
    queryFn: () => queryFn(params),
  });
