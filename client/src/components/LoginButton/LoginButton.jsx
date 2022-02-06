import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '@store/authentification/auth.slice';
import { Button } from 'antd';

const LoginButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: location.pathname } };

  let handleLogout = () => {
    dispatch(logout());
    history.push(from);
  };

  return (
    <Button type='primary' onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default LoginButton;
