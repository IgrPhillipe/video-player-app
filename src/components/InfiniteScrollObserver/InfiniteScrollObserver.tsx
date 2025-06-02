import { ReactNode } from 'react';
import { InView } from 'react-intersection-observer';

type InfiniteScrollObserverProps = {
  isLoading: boolean;
  fetchNextPage?: () => void;
  children: ReactNode;
};

export const InfiniteScrollObserver = ({
  children,
  fetchNextPage,
  isLoading,
}: InfiniteScrollObserverProps) => {
  const handleChangeLoader = (inView: boolean) => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  };

  return (
    <InView
      as="div"
      threshold={0}
      onChange={handleChangeLoader}
      className="col-span-full grid auto-rows-auto gap-y-6 gap-x-8 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full pb-8"
    >
      {isLoading && children}
    </InView>
  );
};
