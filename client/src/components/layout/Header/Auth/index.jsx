import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LoginButton from '@components/LoginButton/LoginButton';

const Auth = () => {
  const menu = (
    <Menu>
      <Menu.Item key={'logout'}>
        <LoginButton />
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} placement='bottomCenter' arrow>
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </div>
  );
};

export default Auth;
