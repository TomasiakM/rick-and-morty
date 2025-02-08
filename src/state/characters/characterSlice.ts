import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICharacter } from '../../types/Character';
import { getById } from '../../api/characterService';
import { getByIds } from '../../api/episodeService';
import { IEpisode } from '../../types/Episode';

interface IState {
  error: string | null;
  isLoading: boolean;
  character: ICharacter | null;
  episodes: IEpisode[];
}

const initialState: IState = {
  character: null,
  episodes: [],
  isLoading: true,
  error: null
};

interface IParams {
  id: number;
}

export const fetchCharacter = createAsyncThunk<
  { character: ICharacter; episodes: IEpisode[] },
  IParams
>('characters/getById', async (params: IParams) => {
  const character = await getById(params);
  const episodeIds = character.episode.map((link) => link.split('/').pop() as string);
  const episodes = await getByIds({ episodeIds });

  return { character, episodes };
});

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
        state.character = action.payload.character;
        state.episodes = action.payload.episodes;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export default characterSlice.reducer;
