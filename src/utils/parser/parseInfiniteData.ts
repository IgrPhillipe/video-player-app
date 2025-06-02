import { PaginatedResponse } from '@/api/common/useInfiniteQueryApi';
import { Video } from '@/api/videos';
import { InfiniteData } from '@tanstack/react-query';

export const parseInfiniteData = (data: InfiniteData<PaginatedResponse> | undefined): Video[] => {
  const dataInfinity = data?.pages.map((page) => page?.data?.map((item: Video) => item) ?? []);

  const organizedData = dataInfinity?.flatMap((item) => item);

  return organizedData ?? [];
};
