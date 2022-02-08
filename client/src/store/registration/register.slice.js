import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { httpPost } from '@config/http';

const initialState = {
  message: null,
  error: null,
  isLoading: false,
};

export const register = createAsyncThunk('register/register', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await httpPost('/api/auth/register', { email, password });
  } catch (err) {
    let error = err;

    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.message = payload.message;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (action.payload) {
        state.message = null;
        state.error = action.payload;
        state.isLoading = false;
      } else {
        state.message = null;
        state.error = action.error.message;
        state.isLoading = false;
      }
    });
  },
});

const selectAuthState = state => state.auth;

export const selectorAuth = createSelector(selectAuthState, state => {
  return {
    token: state.token,
    userId: state.userId,
    error: state.error,
    isLoading: state.isLoading,
  };
});

const selectRegisterState = state => state.register;

export const selectorRegister = createSelector(selectRegisterState, state => ({
  message: state.message,
  error: state.error,
  isLoading: state.isLoading,
}));

export default registerSlice.reducer;
