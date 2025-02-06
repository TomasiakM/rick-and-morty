import { Card, CardContent, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import { ICharacter } from '../../types/Character';
import { Link } from 'react-router';

interface IProps {
  character: ICharacter;
}

const CharacterItem = ({ character }: IProps) => {
  return (
    <Card>
      <Link to={`/character/${character.id}`}>
        <Image src={character.image} alt={character.name} wrapped />
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

      <CardContent extra>
        <Icon name="heartbeat" />
        <span>{character.status}</span>
      </CardContent>
    </Card>
  );
};

export default CharacterItem;
