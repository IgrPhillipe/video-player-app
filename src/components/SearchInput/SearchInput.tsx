'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/search';
import { CustomIconHandle } from '@/types';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();

  const iconRef = useRef<CustomIconHandle>(null);

  const [internalSearch, setInternalSearch] = useState<string>('');

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInternalSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (pathname.startsWith('/video')) {
      return router.push(`/?search=${internalSearch}`);
    }

    if (pathname.startsWith('/favoritos/video')) {
      return router.push(`/favoritos?search=${internalSearch}`);
    }

    if (pathname.startsWith('/assistidos/video')) {
      return router.push(`/assistidos?search=${internalSearch}`);
    }

    setSearch(internalSearch);
  };

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  useEffect(() => {
    setInternalSearch(search);
  }, [search]);

  return (
    <div className="relative w-full h-12">
      <Input
        value={internalSearch}
        onChange={handleSearch}
        placeholder="Pesquisar"
        className="focus-visible:ring-2 focus-visible:ring-neutral-400 bg-foreground rounded-xl h-12"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-y-0 end-0 w-12 flex items-center justify-center h-full dark:bg-accent bg-neutral-300 rounded-r-lg px-2 text-muted-foreground"
      >
        <SearchIcon ref={iconRef} size={16} />
      </button>
    </div>
  );
};
