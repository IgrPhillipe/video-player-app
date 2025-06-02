import { DefaultMutationConfig, MutationFn } from '@/api/common/types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type UseMutationApiParams<TData, TBody = void> = {
  mutationKey: readonly unknown[];
  mutationFn: MutationFn<TData, TBody>;
  mutationConfig?: DefaultMutationConfig<TData, TBody>;
};

export const useMutationApi = <TData, TBody = void>({
  mutationKey,
  mutationFn,
  mutationConfig,
}: UseMutationApiParams<TData, TBody>): UseMutationResult<TData, Error, TBody> =>
  useMutation({
    mutationKey,
    mutationFn,
    ...mutationConfig,
  });
