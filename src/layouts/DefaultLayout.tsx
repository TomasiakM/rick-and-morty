import { Outlet, Link  } from 'react-router'
import { Container, Header } from 'semantic-ui-react'

function DefaultLayout() {

  return (
    <div>
      <header style={{ backgroundColor: '#b5cc18', padding: '10px 0', marginBottom: '0px' }}>
        <Container>
          <Header as='h1'>
            <Link to="/" style={{ color: '#111111'}}>Rick and Morty</Link>
          </Header>
        </Container>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

export default DefaultLayout
