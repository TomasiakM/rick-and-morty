import { IEpisode } from '../types/Episode';

const baseApi = 'https://rickandmortyapi.com/api/episode';

interface IGetByIdsProps {
  episodeIds: string[] | number[];
}

export const getByIds = ({ episodeIds }: IGetByIdsProps): Promise<IEpisode[]> => {
  return fetch(`${baseApi}/[${episodeIds}]`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};
