import { NotFoundLayout } from '@/components/NotFoundLayout';
import { Suspense } from 'react';

export default function NotFoundPage() {
  return (
    <Suspense>
      <NotFoundLayout />
    </Suspense>
  );
}
