import React from 'react';
import { renderWithRedux, screen, cleanup, waitFor } from '@utils/testUtils';
import userEvent from '@testing-library/user-event';
import RegistrationForm from './Registration.form';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { type: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }

  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return { emailInputElement, passwordInputElement, confirmPasswordInputElement };
};

const clickSubmitButton = () => {
  userEvent.click(screen.getByRole('button', { type: 'submit' }));
};

describe('Register form', () => {
  const handleSubmit = jest.fn(() => Promise.resolve());

  beforeEach(async () => {
    renderWithRedux(<RegistrationForm onSubmit={handleSubmit} />);
  });

  afterEach(() => cleanup());

  test('inputs shold be initially empty', () => {
    expect(screen.getByRole('textbox').value).toBe('');
    expect(screen.getByLabelText('Password').value).toBe('');
    expect(screen.getByLabelText(/confirm password/i).value).toBe('');
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

  test('should be able to type a confirm password', async () => {
    const { confirmPasswordInputElement } = typeIntoForm({ confirmPassword: '123123' });

    await waitFor(() => {
      expect(confirmPasswordInputElement.value).toBe('123123');
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

  test('should show password length error message', async () => {
    expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    typeIntoForm({ password: '123' });

    await waitFor(() => {
      expect(screen.queryByText(/password must have minimum 6 characters/i)).toBeInTheDocument();
    });
  });

  test('should not show password length error message', async () => {
    expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    typeIntoForm({ password: '123456' });

    await waitFor(() => {
      expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    });
  });

  test('should show confirm password length error message', async () => {
    expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    typeIntoForm({ confirmPassword: '123' });

    await waitFor(() => {
      expect(screen.queryByText(/password must have minimum 6 characters/i)).toBeInTheDocument();
    });
  });

  test('should not confirm show password length error message', async () => {
    expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    typeIntoForm({ confirmPassword: '123456' });

    await waitFor(() => {
      expect(screen.queryByText(/password must have minimum 6 characters/i)).not.toBeInTheDocument();
    });
  });

  test('should show confirm password error message on empty confirm password', async () => {
    expect(screen.queryByText(/please input your password to confirm!/i)).not.toBeInTheDocument();
    clickSubmitButton();
    await waitFor(() => {
      expect(screen.queryByText(/please input your password to confirm!/i)).toBeInTheDocument();
    });
  });

  test("password field values should show message if they don't match", async () => {
    expect(screen.queryByText(/the two passwords that you entered do not match/i)).not.toBeInTheDocument();
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '456456' });

    await waitFor(() => {
      expect(screen.queryByText(/the two passwords that you entered do not match/i)).toBeInTheDocument();
    });
  });

  test('password field values should not show message if they match', async () => {
    expect(screen.queryByText(/the two passwords that you entered do not match/i)).not.toBeInTheDocument();
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '123123' });

    await waitFor(() => {
      expect(screen.queryByText(/the two passwords that you entered do not match/i)).not.toBeInTheDocument();
    });
  });

  test('onSubmit callback function should be called', async () => {
    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '123123' });

    clickSubmitButton();
    await waitFor(() => {
      expect(handleSubmit).toBeCalled();
    });
  });
});
