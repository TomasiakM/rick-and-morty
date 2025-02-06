import { Grid, GridColumn } from 'semantic-ui-react';
import { ICharacter } from '../../types/Character';
import CharacterItem from './Item';

interface IProps {
  characters: ICharacter[];
}

const CharacterList = ({ characters }: IProps) => {
  return (
    <>
      <Grid stretched style={{ marginTop: '0', marginBottom: '0' }}>
        {characters.map((item) => (
          <GridColumn key={item.id} mobile={8} tablet={4} computer={4}>
            <CharacterItem character={item} />
          </GridColumn>
        ))}
      </Grid>
    </>
  );
};

export default CharacterList;
