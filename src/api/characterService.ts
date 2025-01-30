import { ICharacter } from "../types/Character";
import { IPaginated } from "../types/Pagination";

interface IGetPaginatedProps {
  page?: number;
}

interface IGetByIdProps {
  id: number;
}

const BASE_API = "https://rickandmortyapi.com/api/character";

export const getPaginated = ({
  page = 1,
}: IGetPaginatedProps): Promise<IPaginated<ICharacter>> => {
  return fetch(`${BASE_API}?page=${page}`).then((response) => response.json());
};

export const getById = ({ id }: IGetByIdProps): Promise<ICharacter> => {
  return fetch(`${BASE_API}/${id}`).then((response) => response.json());
};
