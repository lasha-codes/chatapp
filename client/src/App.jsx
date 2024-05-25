import Register from './components/Register'
import axios from 'axios'
import { UserContextProvider } from './context/UserContext'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <UserContextProvider>
      <Register />
    </UserContextProvider>
  )
}

export default App
