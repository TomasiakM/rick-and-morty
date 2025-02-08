import { Icon, Label } from 'semantic-ui-react';
import { CharacterStatus } from '../../types/Character';

interface IProps {
  status: CharacterStatus;
}

const CharacterStatusLabel = ({ status }: IProps) => {
  const getLabelColor = () => {
    if (status === 'Alive') {
      return 'green';
    }

    if (status === 'Dead') {
      return 'red';
    }

    return undefined;
  };

  const getLabelIcon = () => {
    if (status === 'Alive') {
      return 'eye';
    }

    if (status === 'Dead') {
      return 'eye slash';
    }

    return 'question';
  };

  return (
    <Label attached="top left" color={getLabelColor()}>
      <Icon name={getLabelIcon()} />
      {status}
    </Label>
  );
};

export default CharacterStatusLabel;
