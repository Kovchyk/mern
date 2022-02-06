// test-utils.jsx
import React from 'react';
import { Router } from 'react-router-dom';
import history from '../config/history';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import authReducer from '../store/authentification/auth.slice';
import homeReducer from '../modules/Home/homeSlice';

function renderWithRedux(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authReducer, home: homeReducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { renderWithRedux };

// export const renderWithRedux = (
//   component,
//   {
//     initialState,
//     store = configureStore({ reducer: { auth: authReducer, home: homeReducer }, preloadedState }),
//     ...renderOptions
//   } = {},
// ) => {
//   return {
//     ...render(component, <Provider store={store}>{component}</Provider>, ...renderOptions),
//     store,
//   };
// };
