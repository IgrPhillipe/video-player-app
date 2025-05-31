'use client';

import { Video } from '@/modules/public/pages';
import { Suspense } from 'react';

export default function VideoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Video />
    </Suspense>
  );
}
