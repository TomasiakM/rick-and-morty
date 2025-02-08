import { ListContent, ListDescription, ListHeader, ListIcon, ListItem } from 'semantic-ui-react';
import { IEpisode } from '../../types/Episode';

interface IProps {
  episode: IEpisode;
}

const EpisodeItem = ({ episode }: IProps) => {
  return (
    <ListItem key={episode.id}>
      <ListIcon name="film" size="large" verticalAlign="middle" />
      <ListContent>
        <ListHeader>{episode.episode}</ListHeader>
        <ListDescription>
          {episode.name} ({episode.air_date})
        </ListDescription>
      </ListContent>
    </ListItem>
  );
};

export default EpisodeItem;
