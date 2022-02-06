import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, selectorRegister } from '@store/registration/register.slice';
import { Row, Col, Typography, Alert, message } from 'antd';
import RegistrationForm from '../RegistrationForm/Registration.form';

const RegistrationPage = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const registration = useSelector(selectorRegister);
  const registerForm = useRef(null);

  const handleSubmit = values => {
    dispatch(register({ email: values.email, password: values.password }));
  };

  useEffect(() => {
    if (registration.message) {
      message.success(registration.message);
      registerForm.current.resetFields();
    }
  }, [registration.message]);

  return (
    <>
      <Row justify='center'>
        <Col xs={24} md={18} lg={12}>
          <Row align='middle' justify='space-between'>
            <Col>
              <Title>Register</Title>
            </Col>
            <Col>
              {' '}
              <RouterLink to='/login'>Login</RouterLink>
            </Col>
          </Row>
          <RegistrationForm onSubmit={handleSubmit} isLoading={registration.isLoading} ref={registerForm} />
          {registration.error && (
            <Alert message='Error' description={registration.error.message} type='error' showIcon />
          )}
        </Col>
      </Row>
    </>
  );
};

export default RegistrationPage;
