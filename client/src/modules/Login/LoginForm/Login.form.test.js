import React from 'react';
import { renderWithRedux, screen, cleanup, waitFor } from '@utils/testUtils';
import userEvent from '@testing-library/user-event';
import LoginForm from './Login.form';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

const typeIntoForm = ({ email, password }) => {
  const emailInputElement = screen.getByRole('textbox', { type: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');

  if (email) {
    userEvent.type(emailInputElement, email);
  }

  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  return { emailInputElement, passwordInputElement };
};

const clickSubmitButton = () => {
  userEvent.click(screen.getByRole('button', { type: 'submit' }));
};

describe('Login form', () => {
  const handleSubmit = jest.fn(() => Promise.resolve());

  beforeEach(async () => {
    renderWithRedux(<LoginForm onSubmit={handleSubmit} />);
  });

  afterEach(() => cleanup());

  test('inputs shold be initially empty', () => {
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
  });

  test('should be able to type an email', async () => {
    const { emailInputElement } = typeIntoForm({ email: 'kovchyk@gmail.com' });

    await waitFor(() => {
      expect(emailInputElement.value).toBe('kovchyk@gmail.com');
    });
  });

  test('should be able to type a password', async () => {
    const { passwordInputElement } = typeIntoForm({ password: '123123' });

    await waitFor(() => {
      expect(passwordInputElement.value).toBe('123123');
    });
  });

  test('should be able to validate an email', async () => {
    typeIntoForm({ email: 'kovchyk' });

    await waitFor(() => {
      expect(screen.queryByText(/the input is not valid email!/i)).toBeInTheDocument();
    });
  });

  test('should show email error message on empty email', async () => {
    expect(screen.queryByText(/please input your email!/i)).not.toBeInTheDocument();
    clickSubmitButton();
    await waitFor(() => {
      expect(screen.queryByText(/please input your email!/i)).toBeInTheDocument();
    });
  });

  test('should show password error message on empty password', async () => {
    expect(screen.queryByText(/please input your password!/i)).not.toBeInTheDocument();
    clickSubmitButton();
    await waitFor(() => {
      expect(screen.queryByText(/please input your password!/i)).toBeInTheDocument();
    });
  });

  test('onSubmit callback function should be called', async () => {
    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '123123' });
    clickSubmitButton();
    await waitFor(() => {
      expect(handleSubmit).toBeCalled();
    });
  });
});
