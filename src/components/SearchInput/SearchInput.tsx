'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { ChangeEvent } from 'react';

import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
  });

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 300);

  return (
    <div className="relative w-full">
      <Input
        defaultValue={search}
        onChange={handleSearch}
        placeholder="Pesquisar"
        className="focus-visible:ring-2 focus-visible:ring-neutral-400"
      />
      <div className="absolute inset-y-0 start-0 px-2 inline-flex items-center w-fit text-muted-foreground">
        <SearchIcon size={16} />
      </div>
    </div>
  );
};
