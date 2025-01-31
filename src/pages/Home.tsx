import { useEffect, useState } from 'react';
import { IPaginated } from '../types/Pagination';
import { ICharacter } from '../types/Character';
import { Button, DimmerDimmable, Dimmer, Loader, Pagination } from 'semantic-ui-react';
import CharacterList from '../components/character/List';
import { getPaginated } from '../api/characterService';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const [data, setData] = useState(null as IPaginated<ICharacter> | null);
    
    const [page, setPage] = useState(1);

    const fetchData = () => {
        setIsLoading(true)
        setIsError(false)

        getPaginated({ page })
            .then(data => setData(data))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData();
    }, [page])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [data])


    if(isError){
        return <>
            <div>Somethind went wrong...</div>
            <Button color='red' onClick={fetchData}>Try again</Button>
        </>
    }

    return <>
        <DimmerDimmable blurring dimmed={isLoading} style={{ minHeight: '200px'}}>
            <Dimmer inverted active={isLoading}>
                <Loader active={isLoading} size='medium'>Loading</Loader>
            </Dimmer>

            <CharacterList characters={data?.results || []} />

            {data && <Pagination 
                style={{ margin: '12px 0'}}
                totalPages={data.info.pages} 
                activePage={page}
                onPageChange={(_, { activePage }) => setPage(Number(activePage))} />}
        </DimmerDimmable>
    </>
}

export default Home
