import { cn } from '@utils';
import { RailsView } from './RailsView';

/**
 * Example of an app view that uses the PostersRail component.
 * Like VOD.
 */
export const View = () => {
  return (
    <div className={cn('bg-slate-600 w-full space-y-2')}>
      <RailsView />
    </div>
  );
};
