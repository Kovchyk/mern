import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectorAuth } from '@store/authentification/auth.slice';
import { Row, Col, Typography, Alert } from 'antd';
import LoginForm from '../LoginForm/Login.form';

const LoginPage = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const auth = useSelector(selectorAuth);
  const handleSubmit = values => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <>
      <Row justify='center'>
        <Col xs={24} md={18} lg={12}>
          <Row align='middle' justify='space-between'>
            <Col>
              <Title>Login</Title>
            </Col>
            <Col>
              {' '}
              <RouterLink to='/registration'>Register</RouterLink>
            </Col>
          </Row>
          <LoginForm onSubmit={handleSubmit} isLoading={auth.isLoading} />
          {auth.error && <Alert message='Error' description={auth.error.message} type='error' showIcon />}
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
