import { capitalizeWords } from '../formatters';

export const parseVideoTitle = (url: string): string => {
  const pathname = new URL(url).pathname;
  const segments = pathname.split('/');
  const slugWithId = segments.filter(Boolean).pop() ?? '';

  const parts = slugWithId.split('-');
  parts.pop();
  return capitalizeWords(parts.join(' '));
};
