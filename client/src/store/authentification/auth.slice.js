import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { request } from '@config/fetchConfig';
import { STORAGE_NAME } from '@services/constants';

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await request('/api/auth/login', 'POST', { email, password });
    localStorage.setItem(STORAGE_NAME, JSON.stringify({ userId: response.data.userId, token: response.data.token }));

    return response.data;
  } catch (err) {
    let error = err;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: {
      reducer: state => {
        state.token = null;
        state.userId = null;
        localStorage.removeItem(STORAGE_NAME);
      },
    },
    getAuthLocalStorage: {
      reducer: (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      },
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.userId = payload.userId;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.isLoading = false;
      } else {
        state.error = action.error.message;
        state.isLoading = false;
      }
    });
  },
});

const selectAuthState = state => state.auth;

export const selectorAuth = createSelector(selectAuthState, state => ({
  token: state.token,
  userId: state.userId,
  error: state.error,
  isLoading: state.isLoading,
}));

export const { logout, getAuthLocalStorage } = authSlice.actions;

export default authSlice.reducer;
