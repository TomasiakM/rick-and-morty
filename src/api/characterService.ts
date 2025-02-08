import { ICharacter } from '../types/Character';
import { IPaginated } from '../types/Pagination';

interface IGetPaginatedProps {
  page?: number;
  status?: string;
  gender?: string;
}

interface IGetByIdProps {
  id: number;
}

const BASE_API = 'https://rickandmortyapi.com/api/character';

export const getPaginated = ({
  page = 1,
  status = '',
  gender = ''
}: IGetPaginatedProps): Promise<IPaginated<ICharacter>> => {
  return fetch(`${BASE_API}?page=${page}&status=${status}&gender=${gender}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};

export const getById = ({ id }: IGetByIdProps): Promise<ICharacter> => {
  return fetch(`${BASE_API}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};
