import React, {useCallback, useSyncExternalStore} from 'react';
import {useRenderDestination} from './RenderDestinationProvider';

export const RenderDestination = ({name}: {name: string}) => {
  const subscriber = useRenderDestination();

  const container = useSyncExternalStore(
    useCallback(
      (callback) => {
        return subscriber.subscribe(name, callback);
      },
      [subscriber, name],
    ),
    () => {
      return subscriber.getContainer(name);
    },
  );

  return <>container</>;
};
