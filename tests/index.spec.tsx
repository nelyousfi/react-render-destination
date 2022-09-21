import React, {useState} from 'react';
import {fireEvent, render, within} from '@testing-library/react';
import {RenderDestination, RenderTo} from '../src';

const Container = () => {
  const [visible, toggleVisibility] = useState(false);
  return (
    <>
      <button onClick={() => toggleVisibility((v) => !v)}>
        {visible ? 'Hide container' : 'Show container'}
      </button>
      {visible ? (
        <RenderTo destination={'container'}>
          <p>Hello I am rendering from the container</p>
        </RenderTo>
      ) : null}
    </>
  );
};

const App = () => {
  return (
    <>
      <Container />
      <RenderDestination
        name={'container'}
        renderer={(container) => (
          <div aria-label={'container'}>{container}</div>
        )}
      />
    </>
  );
};

describe('test', () => {
  it('renders the component into the destination and unmounting it when the parent is unmounted', () => {
    const {getByText, queryByText, queryByLabelText, getByLabelText} = render(
      <App />,
    );

    fireEvent.click(getByText('Show container'));

    const container = within(getByLabelText('container'));
    expect(
      container.queryByText('Hello I am rendering from the container'),
    ).not.toBeNull();

    fireEvent.click(getByText('Hide container'));

    expect(queryByLabelText('container')).toBeNull();
    expect(queryByText('Hello I am rendering from the container')).toBeNull();
  });
});
