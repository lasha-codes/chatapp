import RegisterAndLoginForm from './components/RegisterAndLoginForm'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

const Routes = () => {
  const { username } = useContext(UserContext)

  if (username) {
    return 'logged in!' + ' ' + username
  }

  return <RegisterAndLoginForm />
}

export default Routes
