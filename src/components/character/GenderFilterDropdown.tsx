import { useSearchParams } from 'react-router';
import { Dropdown } from 'semantic-ui-react';

interface IProps {
  gender: string;
}

const options = [
  { text: 'Female', value: 'Female' },
  { text: 'Male', value: 'Male' },
  { text: 'Genderless', value: 'Genderless' },
  { text: 'unknown', value: 'unknown' }
];

const StatusFilterDropdown = ({ gender }: IProps) => {
  const [, setSearchParams] = useSearchParams();

  const updateGender = (gender: string) => {
    setSearchParams((params) => {
      gender ? params.set('gender', gender) : params.delete('gender');

      return params;
    });
  };

  return (
    <Dropdown
      selection
      clearable
      value={gender}
      options={options}
      placeholder="Gender filter"
      onChange={(_, { value }) => updateGender((value as string) || '')}
    />
  );
};

export default StatusFilterDropdown;
