import { Link } from 'react-router';
import { Button, Header } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header as="h2">Page not found</Header>
      <Link to="/">
        <Button color="olive">Go to home page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
