import { useEffect, useState } from "react"
import { getByIds } from "../../api/episodeService";
import { IEpisode } from "../../types/Episode";
import { Button, Header, Loader } from "semantic-ui-react";

interface IProps {
    episodes: string[]
}

const EpisodeList = ({ episodes }: IProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([] as IEpisode[]);

    const fetchData = () => {
        setIsError(false)
        setIsLoading(true)

        const episodeIds = episodes.map(link => link.split('/').pop() as string)
        getByIds({ episodeIds })
            .then(e => setData(e))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [episodes]);

    if(isError){
        return <>
            <div>Something went wrong...</div>
            <Button color='red' onClick={fetchData}>Try again</Button>
        </>
    }

    if(isLoading) return <Loader active inline='centered' size='medium'>Loading episodes</Loader>

    return <div>
        <Header as="h3" style={{  color: '#FAFAFA', backgroundColor: '#b5cc18', padding: '0.5rem', borderRadius: '0.5rem' }}>
            Played in {data.length} episode{data.length > 1 && 's'}
        </Header>
        <ul>
            {data.map(e => 
                <li key={e.id}><b>{e.episode}</b> - {e.name} ({e.air_date})</li>)}
        </ul>
    </div>
} 

export default EpisodeList