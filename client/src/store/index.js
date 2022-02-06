import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import homeReducer from '../modules/Home/homeSlice';
import authReducer from './authentification/auth.slice';
import registerReducer from './registration/register.slice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    register: registerReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
