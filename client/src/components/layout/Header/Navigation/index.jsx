import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const Navigation = () => {
  const location = useLocation();

  return (
    <Menu theme='dark' mode='horizontal' selectedKeys={[location.pathname]}>
      <Menu.Item key='/'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Item key='/hooks'>
        <Link to='/hooks'>Hooks example</Link>
      </Menu.Item>
      <Menu.Item key='/tasks'>
        <Link to='/tasks'>Tasks example</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
