import { BucketVideoUnits, useBucket } from 'image-cache-preact';
import { useCallback, useState } from 'react';
import { StatusBadge } from '@components';

export const PageVideoUsage = () => {
  const [data, setData] = useState<BucketVideoUnits>();

  const { bucket } = useBucket();
  const onRequestRendered = useCallback(() => {
    setData(bucket.getVideoUnits());
  }, [bucket]);
  useBucket({ onRequestRendered });
  return (
    <StatusBadge
      status="warn"
      text={`VID (${data?.type}) r:${data?.requested.toFixed(2)} u:${data?.used.toFixed(2)}`}
    />
  );
};
