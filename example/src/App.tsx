import React, {useState} from 'react';
import {RenderDestination, RenderTo} from 'react-render-destination';

const Container = () => {
  const [visible, toggleVisibility] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'orange',
        padding: 20,
      }}>
      <button onClick={() => toggleVisibility((v) => !v)}>
        {visible ? 'Hide Modal' : 'Show Modal'}
      </button>
      {visible ? (
        <RenderTo destination={'modal'}>
          <div>I am modal</div>
        </RenderTo>
      ) : null}
    </div>
  );
};

const App = () => (
  <>
    <Container />
    <p>I am another content is between</p>
    <RenderDestination name={'modal'} />
  </>
);

export default App;
