import React from 'react';
import { Layout, Row, Col } from 'antd';
import Navigation from './Navigation';
import Auth from './Auth';

const Header = () => {
  const { Header } = Layout;

  return (
    <Header>
      <Row>
        <Col xs={12} sm={15} md={18}>
          <Navigation />
        </Col>
        <Col xs={12} sm={9} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Auth />
        </Col>
      </Row>
    </Header>
  );
};

export default Header;
