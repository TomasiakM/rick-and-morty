import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchCharacter } from '../../state/characters/characterSlice';
import { AppDispatch, RootState } from '../../state/store';

export const useCharacterPage = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading, character, episodes } = useSelector(
    (state: RootState) => state.character
  );

  useEffect(() => {
    const id = Number(params.id);

    dispatch(fetchCharacter({ id }));
  }, [params]);

  return { error, isLoading, character, episodes };
};
