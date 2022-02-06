import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

const selectHomeState = state => state.home;

export const selectorValue = createSelector(selectHomeState, state => state.value);

export const { increment, decrement } = homeSlice.actions;

export default homeSlice.reducer;
