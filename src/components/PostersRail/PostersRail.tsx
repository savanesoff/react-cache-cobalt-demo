import { BucketProvider } from 'image-cache-react';
import { cn, Topic } from '@utils';
import { HTMLAttributes } from 'react';
import { RailHeader } from './RailHeader';
import { Rail } from './Rail';

type PosterRailProps = HTMLAttributes<HTMLDivElement> & {
  topic: Topic;
  fromPage?: number;
  focused?: boolean;
};
/**
 * An example of poster rail that fetches data and renders cached posters
 */
export const PostersRail = ({
  topic,
  fromPage = 0,
  className,
  focused = false,
  ...props
}: PosterRailProps) => {
  return (
    <BucketProvider name={topic.title}>
      <div className={cn('flex flex-col', className)} {...props}>
        <RailHeader topic={topic} focused={focused} />
        <Rail topic={topic} fromPage={fromPage} focused={focused} />
      </div>
    </BucketProvider>
  );
};
