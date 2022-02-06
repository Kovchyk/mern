import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorAuth } from '@store/authentification/auth.slice';
import { Home, Hooks, Login, Tasks, Registration } from '@modules';

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(selectorAuth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function LoginRoute({ children, ...rest }) {
  const auth = useSelector(selectorAuth);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: location.state ? location.state.from.pathname : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

const Routes = ({ location }) => {
  return (
    <Switch>
      <PrivateRoute exact path='/'>
        <Home />
      </PrivateRoute>
      <PrivateRoute path='/hooks'>
        <Hooks />
      </PrivateRoute>
      <PrivateRoute exact path='/tasks'>
        <Tasks />
      </PrivateRoute>
      <LoginRoute path='/login'>
        <Login />
      </LoginRoute>
      <LoginRoute path='/registration'>
        <Registration />
      </LoginRoute>
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    </Switch>
  );
};

export default Routes;
