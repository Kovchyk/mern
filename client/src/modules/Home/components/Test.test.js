import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Test from './Test';
import store from '../../../store';

describe('TEST BLOCK', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <Test />
      </Provider>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('button is present', () => {
    const button = component.container.querySelector('#test');

    expect(button).toBeInTheDocument();
  });

  test('output click must be 1', () => {
    const button = component.container.querySelector('#test');
    const output = component.container.querySelector('#output');

    act(() => {
      fireEvent.click(button);
    });

    expect(output).toHaveTextContent('Click num: 1');
  });
});
