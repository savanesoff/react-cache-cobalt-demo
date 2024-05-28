import { HTMLAttributes, useEffect } from 'react';
import { useImage } from 'image-cache-react';
import { PosterLoadStatus } from './LoadStatus';
import { PosterRenderStatus } from './RenderStatus';
import { PosterImage } from './PosterImage';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Asset } from '@utils';

export type PosterProps = Omit<HTMLAttributes<HTMLDivElement>, 'onFocus'> & {
  index: number;
  asset: Asset;
  pageNumber: number;
  showImmediately?: boolean;
  onFocus?: (element: HTMLElement) => void;
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
  onFocus,
}: PosterProps) => {
  const { ref, focused } = useFocusable();
  const { width, height, visibilityRef } = useImage();

  useEffect(() => {
    if (focused) {
      onFocus?.(ref.current);
    }
  }, [focused, ref]);

  return (
    <div
      ref={(node) => {
        ref.current = node;
        visibilityRef(node);
      }}
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
