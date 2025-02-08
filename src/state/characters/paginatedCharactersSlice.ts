import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPaginated } from '../../types/Pagination';
import { ICharacter } from '../../types/Character';
import { getPaginated } from '../../api/characterService';

interface IState {
  error: string | null;
  isLoading: boolean;
  data: IPaginated<ICharacter> | null;
}

const initialState: IState = {
  data: null,
  isLoading: true,
  error: null
};

interface IParams {
  page: number;
  status: string;
  gender: string;
}

export const fetchCharacters = createAsyncThunk<IPaginated<ICharacter>, IParams>(
  'characters/getPaginated',
  async (params: IParams) => {
    return await getPaginated(params);
  }
);

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default characterSlice.reducer;
