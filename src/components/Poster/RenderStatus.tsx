import { useImage } from 'image-cache-preact';
import { useCallback, useState } from 'react';
import { StatusBadge } from '@components';

export const PosterRenderStatus = () => {
  const [rendered, setRendered] = useState(false);
  const onRendered = useCallback(() => {
    setRendered(true);
  }, []);

  useImage({ onRendered });
  return (
    <StatusBadge
      status={rendered ? 'warn' : 'off'}
      text={rendered ? '100%' : `0%`}
    />
  );
};
