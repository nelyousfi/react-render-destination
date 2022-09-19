import React, {
  ReactElement,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';
import {useRenderDestination} from './RenderDestinationProvider';
import {uuid} from './utils/uuid';

export const RenderDestination = ({
  name,
  renderer = (container) => <>{container}</>,
}: {
  name: string;
  renderer: (container: ReactElement | ReactElement[]) => ReactElement;
}): ReactElement | null => {
  const id = useRef(uuid());

  const subscriber = useRenderDestination();

  const container = useSyncExternalStore(
    useCallback(
      (callback) => {
        return subscriber.subscribe(name, id.current, callback);
      },
      [subscriber, name],
    ),
    () => {
      return subscriber.getContainer(name);
    },
  );

  return container ? renderer(container) : null;
};
