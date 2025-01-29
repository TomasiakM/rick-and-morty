import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from "./layouts/DefaultLayout"
import Home from './pages/Home'
import Character from "./pages/Character"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
