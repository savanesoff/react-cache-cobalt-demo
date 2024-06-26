import { cn } from '@utils';
import { ControllerProvider } from 'image-cache-preact';

import { View } from '@components';
import {
  FocusContext,
  init,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { CacheLock } from './cacheLock';
import { useCallback, useState } from 'react';
import { CacheStats } from './components/View/CacheStats';
import { Button } from './components/Button';
import { onRenderRequest } from './cacheLock/onRenderRequest';

init({
  // options
  shouldFocusDOMNode: true,
  shouldUseNativeEvents: true,
  // useGetBoundingClientRect: true,
  throttle: 300,
});

export function App() {
  const [lockReady, setLockReady] = useState(false);
  const onCacheLockReady = useCallback(() => {
    setLockReady(true);
  }, []);

  const [showView, setShowView] = useState(false);
  const onToggleView = useCallback(() => {
    setShowView((prev) => !prev);
  }, []);

  const { ref, focusKey } = useFocusable({
    // isFocusBoundary: true,
    // focusBoundaryDirections: ['up', 'down'],
    // trackChildren: true,
    // autoRestoreFocus: true,
    // focusable: true,
    // forceFocus: true,
  });
  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={cn('bg-slate-500', 'text-white', 'w-full', 'h-screen')}
      >
        <div
          className={cn(
            'bg-slate-900',
            'text-slate-300',
            'p-2',
            'w-full',
            'text-l',
          )}
        >
          React Image Cache Demo
          <Button
            disabled={!lockReady}
            title={
              !lockReady
                ? 'loading...'
                : !showView
                  ? 'Launch View'
                  : 'Close View'
            }
            onClick={onToggleView}
            className="text-sm"
          />
        </div>

        <ControllerProvider
          loaders={2}
          ram={400}
          video={240}
          units="MB"
          hwRank={0.5} // 0-1
          gpuDataFull={true}
          renderer={onRenderRequest}
          logLevel="error"
        >
          <>
            <CacheStats />

            {showView && <View />}
            <CacheLock onRendered={onCacheLockReady} />
          </>
        </ControllerProvider>
      </div>
    </FocusContext.Provider>
  );
}
