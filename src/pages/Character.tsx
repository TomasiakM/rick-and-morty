import { useParams } from 'react-router'

function Character() {
  const { id } = useParams();

  return (
    <h3>Character {id}</h3>
  )
}

export default Character
