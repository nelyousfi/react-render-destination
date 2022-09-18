import {ReactNode} from 'react';

type Listener = () => void;

export class RenderDestinationSubscriber {
  private listeners: Map<string, Listener> = new Map();
  private containers: Map<string, ReactNode> = new Map();

  subscribe(name: string, listener: Listener) {
    this.listeners.set(name, listener);
    return () => {
      this.listeners.delete(name);
    };
  }

  update(name: string, container: ReactNode) {
    this.containers.set(name, container);
    this.listeners.get(name)?.();
    return () => {
      this.containers.delete(name);
      this.listeners.get(name)?.();
    };
  }

  getContainer(name: string) {
    return this.containers.get(name);
  }
}
