import { Outlet, Link } from 'react-router';
import { Container, Header } from 'semantic-ui-react';

function DefaultLayout() {
  return (
    <div>
      <header
        style={{
          backgroundColor: '#b5cc18',
          padding: '1rem 0',
          marginBottom: '1.5rem'
        }}>
        <Container>
          <Header as="h1">
            <Link to="/" style={{ color: '#FAFAFA' }}>
              Rick and Morty
            </Link>
          </Header>
        </Container>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default DefaultLayout;
