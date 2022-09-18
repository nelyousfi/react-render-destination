import React, {createContext, ReactNode, useContext} from 'react';
import {RenderDestinationSubscriber} from './RenderDestinationSubscriber';

const RenderDestinationContext = createContext(
  new RenderDestinationSubscriber(),
);

export const RenderDestinationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <RenderDestinationContext.Provider
      value={new RenderDestinationSubscriber()}>
      {children}
    </RenderDestinationContext.Provider>
  );
};

export const useRenderDestination = () => useContext(RenderDestinationContext);
