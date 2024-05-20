import { BucketEvent, useBucket } from 'image-cache-react';
import { useCallback, useState } from 'react';
import { StatusBadge } from '@/components';

export const PageRenderStatus = () => {
  const [progress, setProgress] = useState(0);

  const onRenderProgress = useCallback(
    (event: BucketEvent<'render-progress'>) => {
      setProgress(Math.round(event.progress * 100));
    },
    [],
  );

  useBucket({ onRenderProgress });
  return (
    <StatusBadge
      status={progress === 100 ? 'warn' : 'off'}
      text={`render ${progress}%`}
    />
  );
};
