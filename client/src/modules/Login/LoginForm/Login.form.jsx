import React from 'react';

import { Form, Input, Button } from 'antd';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{
        requiredMarkValue: true,
      }}
      requiredMark={true}
      onFinish={onFinish}
    >
      <Form.Item
        label='Email'
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        tooltip='This is a required field'
      >
        <Input type='email' />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        tooltip='This is a required field'
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item name='submit'>
        <Button type='primary' loading={isLoading} htmlType='submit'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
