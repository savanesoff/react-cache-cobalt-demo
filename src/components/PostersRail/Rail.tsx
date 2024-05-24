import { cn } from '@utils';
import { Topic } from '@utils';
import { PosterPage } from '@components';
import { config } from '@config';
import { HTMLAttributes, useCallback, useMemo, useRef } from 'react';

export type RailProps = HTMLAttributes<HTMLDivElement> & {
  focused: boolean;
  topic: Topic;
  fromPage: number;
};
// pages we want to fetch immediately
// every other page will be fetched when it comes into view
const immediateFetchPages = [0];

export const Rail = ({
  focused,
  topic,
  fromPage,
  className,
  ...props
}: RailProps) => {
  const pages = useMemo(
    () => Array.from({ length: topic.pages }),
    [topic.pages],
  );

  const ref = useRef<HTMLDivElement>(null);
  const onPosterFocus = useCallback((element: HTMLElement) => {
    const parent = ref.current;
    const offsetParent = element.offsetParent as HTMLElement;
    if (!parent || !offsetParent) {
      console.error('Parent or offsetParent is null');
      return;
    }
    if (parent !== offsetParent) {
      console.error('Element is not a child of the parent');
      return;
    }

    // console.log('offsetParent w:', offsetParent.offsetWidth);
    // element.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    //   inline: 'center',
    // });
    const box = { left: 100, right: 100 };

    const scroll = element.offsetLeft - offsetParent.offsetWidth / 2 + box.left;
    console.log('scrollTo:', scroll);

    offsetParent.style.transform = `translateX(-${scroll}px)`;
  }, []);

  return (
    <div
      data-testid="rail-view"
      className={cn(
        'relative',
        ' min-w-fit bg-slate-900  overflow-hidden',
        // 'border-2 border-red-400',
        focused && 'bg-fuchsia-950',
        className,
      )}
      style={{
        height: config.image.renderHeight,
      }}
      {...props}
    >
      <div
        ref={ref}
        data-testid={`rail-scroll-pages`}
        className={cn(
          'absolute top-0 ',
          'flex flex-row  min-w-fit',
          'transition-all duration-300 ease-in-out',
        )}
        style={{
          height: config.image.renderHeight,
        }}
      >
        {pages.map((_, index) => (
          <PosterPage
            key={index}
            name="Poser page main"
            topic={topic}
            pageNumber={index + fromPage}
            immediateFetch={immediateFetchPages.includes(index)}
            onPosterFocus={onPosterFocus}
          />
        ))}
      </div>
    </div>
  );
};
