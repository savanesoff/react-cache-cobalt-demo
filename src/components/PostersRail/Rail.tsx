import { cn } from '@utils';
import { Topic } from '@utils';
import { PosterPage } from '@components';
import { config } from '@config';
import { HTMLAttributes, useMemo } from 'react';

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

  return (
    <div
      data-testid="rail"
      className={cn(
        `h-[${config.image.renderHeight}]`,
        'flex flex-row space-x-2 overflow-y-hidden overflow-x-scroll bg-slate-900 no-scrollbar',
        focused && 'bg-fuchsia-950',
        className,
      )}
      {...props}
    >
      {pages.map((_, index) => (
        <PosterPage
          key={index}
          name="Poser page main"
          topic={topic}
          pageNumber={index + fromPage}
          immediateFetch={immediateFetchPages.includes(index)}
        />
      ))}
    </div>
  );
};
