import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  setGender: Dispatch<SetStateAction<string>>;
}

const options = [
  { text: 'Female', value: 'Female' },
  { text: 'Male', value: 'Male' },
  { text: 'Genderless', value: 'Genderless' },
  { text: 'unknown', value: 'unknown' }
];

const StatusFilterDropdown = ({ setGender }: IProps) => {
  return (
    <Dropdown
      selection
      clearable
      options={options}
      placeholder="Gender filter"
      onChange={(_, { value }) => setGender((value as string) || '')}
    />
  );
};

export default StatusFilterDropdown;
