import React from 'react';
import axios from 'axios';
import { renderWithRedux, screen, cleanup, waitFor } from '@utils/testUtils';
import userEvent from '@testing-library/user-event';
import LoginPage from './Registration.page';

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
    renderWithRedux(<LoginPage />);
  });

  afterEach(() => cleanup());

  test('should show email error message', async () => {
    axios.mockImplementation(() => Promise.reject(getErrorData("Can't find the user")));

    expect(screen.queryByText(/Can't find the user/i)).not.toBeInTheDocument();

    typeIntoForm({ email: 'kovchy@gmail.com' });
    typeIntoForm({ password: '123123' });
    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/Can't find the user/i)).toBeInTheDocument();
    });
  });

  test('should show password error message', async () => {
    axios.mockImplementation(() => Promise.reject(getErrorData('wrong password')));

    expect(screen.queryByText(/Wrong password/i)).not.toBeInTheDocument();

    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '12312' });

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/Wrong password/i)).toBeInTheDocument();
    });
  });

  test('should not have errors on the page', async () => {
    axios.mockImplementation(() =>
      Promise.resolve({
        data: {
          token: 'user_token',
          userId: 1,
        },
      }),
    );

    typeIntoForm({ email: 'kovchyk@gmail.com' });
    typeIntoForm({ password: '123123' });
    clickSubmitButton();

    await waitFor(() => {
      expect(screen.queryByText(/Wrong password/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Can't find the user/i)).not.toBeInTheDocument();
    });
  });
});
