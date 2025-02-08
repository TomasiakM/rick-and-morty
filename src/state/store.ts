import { configureStore } from '@reduxjs/toolkit';
import paginatedCharactersReducer from './characters/paginatedCharactersSlice';

export const store = configureStore({
  reducer: {
    paginatedCharacters: paginatedCharactersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
