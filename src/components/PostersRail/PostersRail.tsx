import { BucketProvider } from 'image-cache-preact';
import { cn, Topic } from '@utils';
import { HTMLAttributes } from 'react';
import { RailHeader } from './RailHeader';
import { Rail } from './Rail';
import {
  FocusContext,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';

type PosterRailProps = HTMLAttributes<HTMLDivElement> & {
  topic: Topic;
  fromPage?: number;
};
/**
 * An example of poster rail that fetches data and renders cached posters
 */
export const PostersRail = ({
  topic,
  fromPage = 0,
  className,
  ...props
}: PosterRailProps) => {
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['left', 'right'],
    trackChildren: true,
  });
  return (
    <FocusContext.Provider value={focusKey}>
      <BucketProvider name={topic.title}>
        <div
          ref={ref}
          className={cn('flex flex-col mt-2', className)}
          {...props}
        >
          <RailHeader topic={topic} focused={hasFocusedChild} />
          <Rail topic={topic} fromPage={fromPage} focused={hasFocusedChild} />
        </div>
      </BucketProvider>
    </FocusContext.Provider>
  );
};
