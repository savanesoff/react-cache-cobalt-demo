import { cn, Topic, getHorizontalScrollPosition } from '@utils';
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const onPosterFocus = useCallback((element: HTMLElement) => {
    const stageElement = stageRef.current;
    const scrollElement = scrollRef.current;

    if (!scrollElement || !element.offsetParent || !stageElement) {
      console.error('Parent or offsetParent is null');
      return;
    }
    if (scrollElement !== element.offsetParent) {
      console.error('Element is not a child of the scroll element');
      return;
    }

    const scrollX = getHorizontalScrollPosition({
      target: element,
      stage: stageElement,
      scrollable: scrollElement,
      paddingLeft: 200,
      paddingRight: 200,
      center: true,
    });
    scrollElement.style.transform = `translateX(-${scrollX}px)`;
  }, []);

  return (
    <div
      ref={stageRef}
      data-testid="rail-view"
      className={cn(
        'relative',
        'w-fit min-w-full bg-slate-900 overflow-hidden',
        // 'bg-green-400',
        focused && 'bg-fuchsia-950',
        className,
      )}
      style={{
        height: config.image.renderHeight,
      }}
      {...props}
    >
      <div
        ref={scrollRef}
        data-testid={`rail-scroll-pages`}
        className={cn(
          'absolute top-0 ',
          'flex flex-row  min-w-[1280px]',
          'transition-all duration-300 ease-in-out',
          // 'bg-red-300',
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
