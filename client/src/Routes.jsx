import RegisterAndLoginForm from './components/RegisterAndLoginForm'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import Chat from './components/Chat'

const Routes = () => {
  const { username } = useContext(UserContext)

  if (username) {
    return <Chat />
  }

  return <RegisterAndLoginForm />
}

export default Routes
