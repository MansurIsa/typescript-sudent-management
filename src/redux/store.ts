import { configureStore } from '@reduxjs/toolkit';
import MainReducer from './MainReducer';

const store = configureStore({
  reducer: {
    Data: MainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 
