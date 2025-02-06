import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { IPaginated } from '../types/Pagination';
import { ICharacter } from '../types/Character';
import { Button, DimmerDimmable, Header, Loader, Pagination } from 'semantic-ui-react';
import CharacterList from '../components/character/List';
import { getPaginated } from '../api/characterService';
import StatusFilterDropdown from '../components/character/StatusFilterDropdown';
import GenderFilterDropdown from '../components/character/GenderFilterDropdown';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null as IPaginated<ICharacter> | null);

  const [page, setPage] = useState(Number(searchParams.get('page') || 1));
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setIsError(false);

    getPaginated({ page, status, gender })
      .then((data) => setData(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const updateParams = () => {
    setSearchParams((params) => {
      params = new URLSearchParams();

      if (page && page !== 1) {
        params.set('page', page.toString());
      }

      if (status) {
        params.set('status', status);
      }

      if (gender) {
        params.set('gender', gender);
      }

      return params;
    });
  };

  useEffect(() => {
    if (!ready) {
      return;
    }

    setPage(Number(searchParams.get('page')) || 1);
    setStatus(searchParams.get('status') || '');
    setGender(searchParams.get('gender') || '');

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    updateParams();
  }, [page]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    setPage(1);
    updateParams();
  }, [status, gender]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [data]);

  if (isError) {
    return (
      <>
        <div>Something went wrong...</div>
        <Button color="red" onClick={fetchData}>
          Try again
        </Button>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundColor: '#b5cc18',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Header as="h3" style={{ margin: 0, color: '#FAFAFA' }}>
          Characters
        </Header>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <GenderFilterDropdown gender={gender} setGender={setGender} />
          <StatusFilterDropdown status={status} setStatus={setStatus} />
        </div>
      </div>

      <DimmerDimmable blurring dimmed={isLoading} style={{ minHeight: '200px' }}>
        <Loader active={isLoading} size="medium">
          Loading
        </Loader>

        <CharacterList characters={data?.results || []} />

        {data && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              style={{ margin: '1.5rem 0' }}
              totalPages={data.info.pages}
              activePage={page}
              onPageChange={(_, { activePage }) => setPage(Number(activePage))}
            />
          </div>
        )}
      </DimmerDimmable>
    </>
  );
};

export default Home;
