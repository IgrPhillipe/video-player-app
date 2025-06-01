'use client';

import { getQueryClient } from '@/lib/react-query';
import { QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query';

export type TanstackProviderProps = Omit<QueryClientProviderProps, 'client'>;

export const TanstackProvider = ({ children, ...props }: TanstackProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
