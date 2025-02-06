import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  setGender: Dispatch<SetStateAction<string>>;
  gender: string;
}

const options = [
  { text: 'Female', value: 'Female' },
  { text: 'Male', value: 'Male' },
  { text: 'Genderless', value: 'Genderless' },
  { text: 'unknown', value: 'unknown' }
];

const StatusFilterDropdown = ({ gender, setGender }: IProps) => {
  return (
    <Dropdown
      selection
      clearable
      value={gender}
      options={options}
      placeholder="Gender filter"
      onChange={(_, { value }) => setGender((value as string) || '')}
    />
  );
};

export default StatusFilterDropdown;
