import axios from 'axios'
import { UserContextProvider } from './context/UserContext'

import Routes from './Routes'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}

export default App
