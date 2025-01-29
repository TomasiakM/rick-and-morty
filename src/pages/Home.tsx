import { Link  } from 'react-router'

function Home() {
  return (
    <>
      <h3>Home page</h3>
      <div><Link to='/character/1'>Character 1</Link></div>
      <div><Link to='/character/2'>Character 2</Link></div>
    </>
  )
}

export default Home
