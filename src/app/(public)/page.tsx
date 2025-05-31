import { Home } from '@/modules/public/pages';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
