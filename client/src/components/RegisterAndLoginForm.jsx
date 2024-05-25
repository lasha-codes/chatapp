import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register')
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isLoginOrRegister === 'register' ? '/register' : '/login'
    try {
      const { data } = await axios.post(url, { username, password })
      setLoggedInUsername(username)
      setId(data._id)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='username'
          className='block w-full rounded p-2 mb-2 border outline-blue-500'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
          className='block w-full rounded p-2 mb-2 border outline-blue-500'
        />
        <button className='bg-blue-500 text-white block p-2 w-full rounded-sm'>
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button onClick={() => setIsLoginOrRegister('login')}>
                Login here
              </button>
            </div>
          ) : (
            <div>
              {"Don't have an account?"}
              <button onClick={() => setIsLoginOrRegister('register')}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default RegisterAndLoginForm
