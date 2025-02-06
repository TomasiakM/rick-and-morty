import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  setStatus: Dispatch<SetStateAction<string>>;
}

const options = [
  { key: 'alive', text: 'Alive', value: 'alive' },
  { key: 'dead', text: 'Dead', value: 'dead' },
  { key: 'unknown', text: 'unknown', value: 'unknown' }
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
