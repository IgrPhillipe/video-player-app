import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientConfig,
} from '@tanstack/react-query';

export const makeQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  } as QueryClientConfig);

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = (): QueryClient => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
