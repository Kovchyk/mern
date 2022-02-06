import React, { forwardRef } from 'react';

import { Form, Input, Button } from 'antd';

const RegistrationForm = forwardRef(({ onSubmit, isLoading }, ref) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    onSubmit(values);
  };

  return (
    <Form
      ref={ref}
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
          { min: 6, message: 'Password must have minimum 6 characters.' },
        ]}
        tooltip='This is a required field'
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item
        label='Confirm password'
        name='confirm-password'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please input your password to confirm!',
          },
          { min: 6, message: 'Password must have minimum 6 characters.' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        tooltip='This is a required field'
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item name='submit'>
        <Button type='primary' loading={isLoading} htmlType='submit'>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
});

export default RegistrationForm;
