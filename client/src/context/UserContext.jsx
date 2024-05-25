/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    try {
      axios.get('/profile').then((response) => {
        setId(response.data.userId)
        setUsername(response.data.username)
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  console.log({ username, id })

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  )
}
