import { Outlet, Link  } from 'react-router'

function DefaultLayout() {

  return (
    <div>
      <header>
        <Link to="/">Rick and Morty</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout
