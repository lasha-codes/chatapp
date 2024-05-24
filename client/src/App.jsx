import Register from './components/Register'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

const App = () => {
  return <Register />
}

export default App
