import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
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

export type DefaultMutationConfig<TData, TBody> = Omit<
  UseMutationOptions<TData, Error, TBody>,
  'mutationFn'
>;

export type MutationFn<TData, TBody> = (params: TBody) => Promise<TData>;
