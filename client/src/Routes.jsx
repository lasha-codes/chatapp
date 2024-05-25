import Register from './components/Register'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

const Routes = () => {
  const { username } = useContext(UserContext)

  if (username) {
    return 'logged in!'
  }

  return <Register />
}

export default Routes
