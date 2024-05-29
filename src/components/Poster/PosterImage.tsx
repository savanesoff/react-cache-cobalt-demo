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
export const PosterImage = ({
  focused = false,
  asset,
  index,
  pageNumber,
  showImmediately,
}: PosterImageProps) => {
  const { url, width, height } = useImage();
  const [show, setShow] = useState(showImmediately);

  const onBucketReady = useCallback(() => {
    setShow(true);
  }, []);

  useBucket({ onRendered: onBucketReady });

  const hash = useMemo(() => {
    // get url ?hash url param value
    const hash = url?.split('?hash=')[1];
    return hash;
  }, [url]);

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
          'opacity-0 transition-opacity duration-1000 ease-in-out',
          'h-full w-full',
          show && 'opacity-100',
        )}
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: `${width}px ${height}px`,
        }}
      />

      <AssetInfo
        focused={focused}
        index={index}
        pageNumber={pageNumber}
        hash={hash}
        asset={asset}
      />
    </div>
  );
};

const AssetInfo = ({
  focused,
  index,
  pageNumber,
  hash,
  asset,
}: {
  focused?: boolean;
  index?: number;
  pageNumber?: number;
  hash?: string;
  asset: Asset;
}) => {
  return (
    <div
      className={cn(
        'absolute bottom-0 w-full max-w-full overflow-hidden bg-slate-900',
        'duration-0 transition-all ease-in-out',
        'flex flex-col items-start justify-start text-xl text-slate-50',
        'h-1/2  opacity-0',
        focused && 'opacity-80',
      )}
    >
      <div className="p-1">
        <div className="text-sm">
          i:{index} p:{pageNumber}
        </div>
        <div className="text-xs">Hash {hash}</div>
        <div className="text-xs">Title {asset.title}</div>
        {/* <div className="text-xs">{asset.description}</div> */}
      </div>
    </div>
  );
};
