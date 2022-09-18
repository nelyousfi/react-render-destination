import {ReactElement, useEffect} from 'react';
import {useRenderDestination} from './RenderDestinationProvider';

export const RenderTo = ({
  destination,
  children,
}: {
  destination: string;
  children: ReactElement;
}) => {
  const subscriber = useRenderDestination();

  useEffect(() => {
    return subscriber.update(destination, children);
  });

  return null;
};
