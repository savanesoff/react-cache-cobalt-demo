import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BucketProviderProps, ImageProvider } from 'image-cache-react';
import { Asset, AssetPage, fetchAssets, Topic, cn } from '@utils';
import { Poster } from '@components';
import { config } from '@config';
import { useVisibilityObserver } from 'image-cache-react';

export type PosterPageProps = HTMLAttributes<HTMLDivElement> &
  Exclude<BucketProviderProps, 'children'> & {
    topic: Topic;
    pageNumber: number;
    /** Array of page numbers to fetch initially */
    immediateFetch?: boolean;
    onPosterFocus?: (element: HTMLElement) => void;
  };

/**
 * Component that renders a section of a poster rail (page)
 * with its load status and progress.
 */
export const PosterPage = ({
  topic,
  pageNumber,
  className,
  immediateFetch,
  onPosterFocus,
  ...props
}: PosterPageProps) => {
  const [pageData, setPageData] = useState<AssetPage>();
  const [fetchStatus, setFetchStatus] = useState<
    'idle' | 'loading' | 'loaded' | 'error'
  >('idle');
  /**
   * Fetches the assets for the page
   */
  const fetchData = useCallback(async () => {
    console.log('fetching page data', topic, pageNumber);
    setFetchStatus('loading');
    const data = await fetchAssets({
      topic,
      page: pageNumber,
    });
    if (data) {
      setPageData(data);
      setFetchStatus('loaded');
    } else {
      setFetchStatus('error');
    }
  }, [topic, pageNumber]);

  const onVisible = useCallback(() => {
    if (fetchStatus === 'idle') fetchData();
  }, [fetchData, fetchStatus]);

  const { ref } = useVisibilityObserver({
    root: document.getElementById('root'),
    rootMargin: config.visibilityMargin,
    onVisible,
  });

  useEffect(() => {
    if (immediateFetch) {
      fetchData();
    }
  }, [fetchData, immediateFetch]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-shrink-0 flex-grow flex-row overflow-y-clip',
        className,
      )}
      {...props}
    >
      {!pageData && <div>{fetchStatus}</div>}
      {pageData?.assets.map((asset, index) => (
        <ImageContent
          key={asset.title}
          asset={asset}
          index={index}
          pageNumber={pageNumber}
          showImmediately={!immediateFetch}
          onFocus={onPosterFocus}
        />
      ))}
    </div>
  );
};

/**
 * Since headers are created on the fly, we need to memoize them
 * @param param0
 * @returns
 */
const ImageContent = ({
  asset,
  index,
  pageNumber,
  showImmediately,
  onFocus,
}: {
  asset: Asset;
  index: number;
  pageNumber: number;
  showImmediately?: boolean;
  onFocus?: (element: HTMLElement) => void;
}) => {
  const headers = useMemo(
    () => ({
      'Content-Type': asset.mimeType,
    }),
    [asset.mimeType],
  );

  return (
    <ImageProvider
      key={index}
      url={asset.url}
      type={asset.colorType}
      headers={headers}
      width={config.image.renderWidth}
      height={config.image.renderHeight}
      visibilityMargin={config.visibilityMargin}
    >
      <Poster
        index={index}
        asset={asset}
        pageNumber={pageNumber}
        showImmediately={showImmediately}
        onFocus={onFocus}
      />
    </ImageProvider>
  );
};
