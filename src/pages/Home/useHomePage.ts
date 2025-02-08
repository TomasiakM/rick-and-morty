import { RootState } from '../../state/store';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { fetchCharacters } from '../../state/characters/paginatedCharactersSlice';
import { AppDispatch } from '../../state/store';

export const useHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const { error, isLoading, data } = useSelector((state: RootState) => state.paginatedCharacters);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [params, setParams] = useState({
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || ''
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(fetchCharacters({ ...params, page }));
  }, [page, params]);

  useEffect(() => {
    if (!isReady) return;
    const pageParam = searchParams.get('page');
    const nextPage = Number(pageParam);
    if (pageParam && page === nextPage) {
      handlePageChange(1);
      return;
    }

    setPage(Number(searchParams.get('page')) || 1);
    setParams({
      status: searchParams.get('status') || '',
      gender: searchParams.get('gender') || ''
    });
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handlePageChange = (page: number) => {
    setSearchParams((urlParams) => {
      page !== 1 ? urlParams.set('page', page.toString()) : urlParams.delete('page');

      return urlParams;
    });
  };

  return { error, isLoading, data, page, params, handlePageChange };
};
