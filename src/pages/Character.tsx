import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { getById } from '../api/characterService';
import { ICharacter } from '../types/Character';
import { Button, Grid, GridColumn, Image, Loader } from 'semantic-ui-react';
import EpisodeList from '../components/episode/List';

function Character() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [character, setCharacter] = useState(null as ICharacter | null);

  const fetchData = () => {
    const idNumber = Number(params.id);
    if(isNaN(idNumber)) return;

    setIsLoading(true)
    setIsError(false)

    getById({ id: idNumber })
      .then(e => setCharacter(e))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [params])

  if(isError) return <>
    <div>Something went wrong...</div>
    <Button color='red' onClick={fetchData}>Try again</Button>
  </>

  if(isLoading) return <Loader active inline='centered' size='medium'>Loading</Loader>

  return <>
    {character && <>
      <Grid style={{ marginTop: '0', marginBottom: '0' }}>
        <GridColumn mobile={16} tablet={8} computer={8}>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Image src={character.image} alt={character.name} />
          </div>
        </GridColumn>
        <GridColumn mobile={16} tablet={8} computer={8}>
          <h2>{character.name}</h2>
          <div>Gender: <b>{character.gender}</b></div>
          <div>Status: <b>{character.status}</b></div>
          <div>Species: <b>{character.species}</b></div>
          {character.type && <div>Type: <b>{character.type}</b></div>}
        </GridColumn>
      </Grid>
      
      <EpisodeList episodes={character.episode} />
    </>
      
    }
    </>
}

export default Character
