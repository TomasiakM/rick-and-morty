import { DimmerDimmable, Header, Loader, Pagination } from 'semantic-ui-react';
import CharacterList from '../../components/character/List';
import { useHomePage } from './useHomePage';
import StatusFilterDropdown from '../../components/character/StatusFilterDropdown';
import GenderFilterDropdown from '../../components/character/GenderFilterDropdown';

const Home = () => {
  const { error, isLoading, data, page, params, handlePageChange } = useHomePage();

  if (error) {
    return (
      <Header as="h3" color="red" style={{ margin: '0 auto' }}>
        {error}
      </Header>
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
          <StatusFilterDropdown status={params.status} />
          <GenderFilterDropdown gender={params.gender} />
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
              onPageChange={(_, { activePage }) => handlePageChange(Number(activePage) || 1)}
            />
          </div>
        )}
      </DimmerDimmable>
    </>
  );
};

export default Home;
