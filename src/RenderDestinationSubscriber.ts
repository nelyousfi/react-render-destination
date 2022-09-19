import {ReactElement} from 'react';

type Listener = () => void;

export class RenderDestinationSubscriber {
  private listeners: Map<
    string,
    {
      id: string;
      listener: Listener;
    }
  > = new Map();
  private containers: Map<string, ReactElement | ReactElement[]> = new Map();

  subscribe(name: string, id: string, listener: Listener) {
    if (
      process.env.NODE_ENV !== 'production' &&
      this.listeners.has(name) &&
      this.listeners.get(name)?.id !== id
    ) {
      console.warn(
        `Two or more mounted destinations are subscribing with name ${name}, please make sure that you have only one`,
      );
    }
    this.listeners.set(name, {
      id,
      listener,
    });
    if (this.containers.has(name)) {
      listener();
    }
    return () => {
      this.listeners.delete(name);
    };
  }

  update(name: string, container: ReactElement | ReactElement[]) {
    if (process.env.NODE_ENV !== 'production' && this.containers.has(name)) {
      console.warn(
        `Two or more mounted components are updating the same destination with name ${name}, please make sure that you have only one`,
      );
    }
    this.containers.set(name, container);
    this.listeners.get(name)?.listener();
    return () => {
      this.containers.delete(name);
      this.listeners.get(name)?.listener();
    };
  }

  getContainer(name: string) {
    return this.containers.get(name);
  }
}
