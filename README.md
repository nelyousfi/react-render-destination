# react-render-destination

A React/ReactNative library based on useSyncExternalStore to render components into other destinations outside the parent component.



https://user-images.githubusercontent.com/26110116/191819232-8377e7ae-7b6a-4543-8b1e-74ef07ac1f0a.mp4



## Installation:

This library is available on npm, install it with: `npm i react-render-destination` or `yarn add react-render-destination`.

## Usage:

1. [Optional]: Unless you need multiple subscriptions with the same name in different destinations of your app, you don't have to wrap the root component with RenderDestinationProvider.

```tsx
import {RenderDestinationProvider} from 'react-render-destination';

return (
  <RenderDestinationProvider>
    <App />
  </RenderDestinationProvider>
);
```

2. Add the RenderDestination where you want to render the component into.

```tsx
import {RenderDestination} from 'react-render-destination';

return (
  <>
    <App />
    <RenderDestination
      name={'destination'}
      renderer={(container) => <div>{container}</div>}
    />
  </>
);
```

- **name**: [required] the name of your destination.
- **renderer**: [optional] if you want to wrap the received component with a custom parent (the default is a React fragment)

3. Add the RenderTo where you want to render the component from:

```tsx
import {RenderTo} from 'react-render-destination';

return (
  <RenderTo name={'destination'}>
    <p>Hello I am the content that will be rendered in the destination</p>
  </RenderTo>
);
```

- **name**: [required] the name of the destination, should be the same as the one in RenderDestination.
- **children**: [required] the component you want to render in the destination.

The resulting code will be something like as far as the original component is mounted (step 3):

```tsx
return (
  <>
    <App />
    <div>
      <p>Hello I am the content that will be rendered in the destination</p>
    </div>
  </>
);
```
