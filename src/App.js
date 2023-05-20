import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import UserModal from './Components/User Modal/UserModal'
import UsersList from './Components/Users List/UsersList'

const App = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route exact path='/' element={<UsersList />} />
          <Route exact path='/modal/:id' element={<UserModal />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
