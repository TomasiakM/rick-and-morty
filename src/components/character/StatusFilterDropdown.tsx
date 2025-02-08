import { useSearchParams } from 'react-router';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  status: string;
}

const options = [
  { text: 'Alive', value: 'Alive' },
  { text: 'Dead', value: 'Dead' },
  { text: 'unknown', value: 'unknown' }
];

const StatusFilterDropdown = ({ status }: IProps) => {
  const [, setSearchParams] = useSearchParams();

  const updateStatus = (status: string) => {
    setSearchParams((params) => {
      status ? params.set('status', status) : params.delete('status');

      return params;
    });
  };

  return (
    <Dropdown
      selection
      clearable
      value={status}
      options={options}
      placeholder="Status filter"
      onChange={(_, { value }) => updateStatus((value as string) || '')}
    />
  );
};

export default StatusFilterDropdown;
