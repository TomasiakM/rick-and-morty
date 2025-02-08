import { IEpisode } from '../../types/Episode';
import { Header, List } from 'semantic-ui-react';
import EpisodeItem from './Item';

interface IProps {
  episodes: IEpisode[];
}

const EpisodeList = ({ episodes }: IProps) => {
  return (
    <div>
      <Header
        as="h3"
        style={{
          color: '#FAFAFA',
          backgroundColor: '#b5cc18',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
        Played in {episodes.length} episode{episodes.length > 1 && 's'}
      </Header>
      <List>
        {episodes.map((episode) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
      </List>
    </div>
  );
};

export default EpisodeList;
