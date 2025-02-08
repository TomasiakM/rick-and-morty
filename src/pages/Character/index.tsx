import { Grid, GridColumn, Header, Image, Loader } from 'semantic-ui-react';
import EpisodeList from '../../components/episode/List';
import { useCharacterPage } from './useCharacterPage';

function Character() {
  const { error, isLoading, character, episodes } = useCharacterPage();

  if (error)
    return (
      <Header as="h3" color="red" style={{ margin: '0 auto' }}>
        {error}
      </Header>
    );

  if (isLoading)
    return (
      <Loader active inline="centered" size="medium">
        Loading
      </Loader>
    );

  return (
    <>
      {character && (
        <>
          <Grid style={{ marginTop: '0', marginBottom: '2rem' }}>
            <GridColumn mobile={16} tablet={8} computer={8}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image rounded src={character.image} alt={character.name} />
              </div>
            </GridColumn>
            <GridColumn mobile={16} tablet={8} computer={8}>
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                <Header as="h2" style={{ color: '#b5cc18' }}>
                  {character.name}
                </Header>
                <div>
                  Gender: <b>{character.gender}</b>
                </div>
                <div>
                  Status: <b>{character.status}</b>
                </div>
                <div>
                  Species: <b>{character.species}</b>
                </div>
                {character.type && (
                  <div>
                    Type: <b>{character.type}</b>
                  </div>
                )}

                <br />

                {character.location.name && (
                  <div>
                    Location: <b>{character.location.name}</b>
                  </div>
                )}
                {character.origin.name && (
                  <div>
                    Origin: <b>{character.origin.name}</b>
                  </div>
                )}
              </div>
            </GridColumn>
          </Grid>

          <EpisodeList episodes={episodes} />
        </>
      )}
    </>
  );
}

export default Character;
