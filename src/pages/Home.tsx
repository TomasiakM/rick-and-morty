import { useEffect, useState } from 'react';
import { IPaginated } from '../types/Pagination';
import { ICharacter } from '../types/Character';
import { Button, DimmerDimmable, Header, Loader, Pagination } from 'semantic-ui-react';
import CharacterList from '../components/character/List';
import { getPaginated } from '../api/characterService';
import StatusFilterDropdown from '../components/character/StatusFilterDropdown';
import GenderFilterDropdown from '../components/character/GenderFilterDropdown';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [data, setData] = useState(null as IPaginated<ICharacter> | null);

  const [gender, setGender] = useState('');

  const fetchData = () => {
    setIsLoading(true);
    setIsError(false);

    getPaginated({ page, status, gender })
      .then((data) => setData(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      return fetchData();
    }

    setPage(1);
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
          <GenderFilterDropdown setGender={setGender} />
          <StatusFilterDropdown setStatus={setStatus} />
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
