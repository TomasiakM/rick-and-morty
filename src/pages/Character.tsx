import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid, GridColumn, Header, Image, Loader } from 'semantic-ui-react';
import EpisodeList from '../components/episode/List';
import { AppDispatch, RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../state/characters/characterSlice';

function Character() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading, data } = useSelector((state: RootState) => state.character);

  useEffect(() => {
    const id = Number(params.id);

    dispatch(fetchCharacter({ id }));
  }, [params]);

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
      {data && (
        <>
          <Grid style={{ marginTop: '0', marginBottom: '2rem' }}>
            <GridColumn mobile={16} tablet={8} computer={8}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={data.image} alt={data.name} />
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
                  {data.name}
                </Header>
                <div>
                  Gender: <b>{data.gender}</b>
                </div>
                <div>
                  Status: <b>{data.status}</b>
                </div>
                <div>
                  Species: <b>{data.species}</b>
                </div>
                {data.type && (
                  <div>
                    Type: <b>{data.type}</b>
                  </div>
                )}

                <br />

                {data.location.name && (
                  <div>
                    Location: <b>{data.location.name}</b>
                  </div>
                )}
                {data.origin.name && (
                  <div>
                    Origin: <b>{data.origin.name}</b>
                  </div>
                )}
              </div>
            </GridColumn>
          </Grid>

          <EpisodeList episodes={data.episode} />
        </>
      )}
    </>
  );
}

export default Character;
