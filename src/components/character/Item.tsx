import { Card, CardContent, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import { ICharacter } from '../../types/Character';
import { Link } from 'react-router';
import CharacterStatusLabel from './StatusLabel';

interface IProps {
  character: ICharacter;
}

const CharacterItem = ({ character }: IProps) => {
  return (
    <Card>
      <Link to={`/character/${character.id}`}>
        <Image src={character.image} alt={character.name} wrapped />

        <CharacterStatusLabel status={character.status} />
      </Link>

      <CardContent>
        <CardHeader>
          <Link to={`/character/${character.id}`}>{character.name}</Link>
        </CardHeader>

        <CardMeta>
          <span>
            {character.species}, {character.gender}
          </span>
        </CardMeta>
      </CardContent>
    </Card>
  );
};

export default CharacterItem;
