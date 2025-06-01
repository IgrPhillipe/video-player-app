import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type PaginationParams = {
  page: number;
};

export type DefaultInfiniteQueryConfig<TData> = Partial<
  UseInfiniteQueryOptions<TData, Error, InfiniteData<TData, Error>, TData, QueryKey, number>
>;

export type QueryFn<TData, TParams = void> = (params: TParams) => Promise<TData>;

export type DefaultQueryConfig<TData> = Omit<
  UseQueryOptions<TData, Error, TData>,
  'queryKey' | 'queryFn'
>;

export type UseQueryFnParams<T = void> = {
  params?: T;
};
