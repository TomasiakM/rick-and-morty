import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICharacter } from '../../types/Character';
import { getById } from '../../api/characterService';

interface IState {
  error: string | null;
  isLoading: boolean;
  data: ICharacter | null;
}

const initialState: IState = {
  data: null,
  isLoading: true,
  error: null
};

interface IParams {
  id: number;
}

export const fetchCharacter = createAsyncThunk<ICharacter, IParams>(
  'characters/getById',
  async (params: IParams) => {
    return await getById(params);
  }
);

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default characterSlice.reducer;
