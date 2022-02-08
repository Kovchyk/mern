import React from 'react';
import axios from 'axios';
import { renderWithRedux, screen, cleanup, waitFor } from '@utils/testUtils';
import userEvent from '@testing-library/user-event';
import RegistrationPage from './Registration.page';

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('axios');

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
  userEvent.click(screen.getByRole('button'));
};

const getErrorData = message => {
  return {
    response: {
      data: {
        message,
      },
    },
  };
};

describe('Registration page', () => {
  beforeEach(() => {
    renderWithRedux(<RegistrationPage />);
  });

  afterEach(() => cleanup());

  test('should content register header', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('should show email error message', async () => {
    axios.post.mockImplementation(() => Promise.reject(getErrorData('The user already exists')));

    expect(screen.queryByText(/The user already exists/i)).not.toBeInTheDocument();

    typeIntoForm({ email: 'kovchy@gmail.com' });
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '123123' });

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/The user already exists/i)).toBeInTheDocument();
    });
  });

  test('should not have errors on the page', async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        message: 'User was created',
      }),
    );

    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '123123' });

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/The user already exists/i)).not.toBeInTheDocument();
    });
  });

  test("should show 'user was created' message", async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        message: 'User was created',
      }),
    );

    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '123123' });
    typeIntoForm({ confirmPassword: '123123' });

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/user was created/i)).toBeInTheDocument();
    });
  });

  // test('should clear inputs on success', async () => {
  //   axios.post.mockImplementation(() =>
  //     Promise.resolve({
  //       message: 'User was created',
  //     }),
  //   );

  //   const { emailInputElement } = typeIntoForm({ email: 'kovchyk@gmail.com' });
  //   const { passwordInputElement } = typeIntoForm({ password: '123123' });
  //   const { confirmPasswordInputElement } = typeIntoForm({ confirmPassword: '123123' });

  //   clickSubmitButton();

  //   await waitFor(() => {
  //     expect(emailInputElement.value).toBe('');
  //     expect(passwordInputElement.value).toBe('');
  //     expect(confirmPasswordInputElement.value).toBe('');
  //   });
  // });
});
