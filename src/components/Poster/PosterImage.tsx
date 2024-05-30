import { useImage, useBucket } from 'image-cache-react';
import { cn, Asset } from '@utils';
import { useState, useCallback, useMemo } from 'react';

type PosterImageProps = {
  focused?: boolean;
  asset: Asset;
  index?: number;
  pageNumber?: number;
  showImmediately?: boolean;
};
/**
 * Renders the poster image using the useImage hook.
 */
export const PosterImage = ({ showImmediately }: PosterImageProps) => {
  const { url, width, height } = useImage();
  const [show, setShow] = useState(showImmediately);

  const onBucketReady = useCallback(() => {
    setShow(true);
  }, []);

  useBucket({ onRendered: onBucketReady });

  return (
    <div
      className={cn('bg-cyan-900', url && 'bg-orange-500 ')}
      style={{
        width,
        height,
        // for cobalt
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
        position: 'relative',
      }}
    >
      <div
        className={cn(
          'transition-all duration-[3000ms] ease-in-out',
          'h-full w-full',
        )}
        style={{
          backgroundImage: url ? `url(${url})` : 'none',
          backgroundSize: url ? `${width}px ${height}px` : '0',
          // opacity: show && url ? 1 : 0,
        }}
      />
    </div>
  );
};
