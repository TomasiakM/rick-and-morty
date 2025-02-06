import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  setStatus: Dispatch<SetStateAction<string>>;
}

const options = [
  { text: 'Alive', value: 'Alive' },
  { text: 'Dead', value: 'Dead' },
  { text: 'unknown', value: 'unknown' }
];

const StatusFilterDropdown = ({ setStatus }: IProps) => {
  return (
    <Dropdown
      selection
      clearable
      options={options}
      placeholder="Status filter"
      onChange={(_, { value }) => setStatus((value as string) || '')}
    />
  );
};

export default StatusFilterDropdown;
