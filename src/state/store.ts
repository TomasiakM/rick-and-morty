import { configureStore } from '@reduxjs/toolkit';
import paginatedCharactersReducer from './characters/paginatedCharactersSlice';
import characterReducer from './characters/characterSlice';

export const store = configureStore({
  reducer: {
    paginatedCharacters: paginatedCharactersReducer,
    character: characterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
