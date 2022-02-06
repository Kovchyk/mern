import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { request } from '@config/fetchConfig';

const initialState = {
  message: null,
  error: null,
  isLoading: false,
};

export const register = createAsyncThunk('auth/register', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await request('/api/auth/register', 'POST', { email, password });

    return response.data;
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

const selectRegisterState = state => state.register;

export const selectorRegister = createSelector(selectRegisterState, state => ({
  message: state.message,
  error: state.error,
  isLoading: state.isLoading,
}));

export default registerSlice.reducer;
