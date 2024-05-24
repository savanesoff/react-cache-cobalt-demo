import { HTMLAttributes, useEffect } from 'react';
import { useImage } from 'image-cache-react';
import { PosterLoadStatus } from './LoadStatus';
import { PosterRenderStatus } from './RenderStatus';
import { PosterImage } from './PosterImage';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Asset } from '@utils';

export type PosterProps = HTMLAttributes<HTMLDivElement> & {
  index: number;
  asset: Asset;
  pageNumber: number;
  showImmediately?: boolean;
};

/**
 * Poster component to display the image.
 * Uses the useImage hook to load the image.
 */
export const Poster = ({
  index,
  asset,
  pageNumber,
  showImmediately,
}: PosterProps) => {
  const { ref, focused } = useFocusable();
  const { width, height } = useImage({ ref });

  useEffect(() => {
    if (focused) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [focused, ref]);

  return (
    <div
      ref={ref}
      className={'mr-2'}
      style={{
        width: width,
        height: height,
        minHeight: height,
        minWidth: width,
        maxHeight: height,
        maxWidth: width,
        position: 'relative',
      }}
    >
      <PosterImage
        focused={focused}
        asset={asset}
        index={index}
        pageNumber={pageNumber}
        showImmediately={showImmediately}
      />
      <div
        className={'absolute top-0 flex h-4 w-full flex-row justify-between'}
      >
        <PosterLoadStatus />
        <PosterRenderStatus />
      </div>
    </div>
  );
};
