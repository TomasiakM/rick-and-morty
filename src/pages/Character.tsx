import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getById } from '../api/characterService';
import { ICharacter } from '../types/Character';
import { Button, Grid, GridColumn, Header, Image, Loader } from 'semantic-ui-react';
import EpisodeList from '../components/episode/List';

function Character() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [character, setCharacter] = useState(null as ICharacter | null);

  const fetchData = () => {
    const idNumber = Number(params.id);
    if (isNaN(idNumber)) return;

    setIsLoading(true);
    setIsError(false);

    getById({ id: idNumber })
      .then((e) => setCharacter(e))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  if (isError)
    return (
      <>
        <div>Something went wrong...</div>
        <Button color="red" onClick={fetchData}>
          Try again
        </Button>
      </>
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
                <Image src={character.image} alt={character.name} />
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

          <EpisodeList episodes={character.episode} />
        </>
      )}
    </>
  );
}

export default Character;
