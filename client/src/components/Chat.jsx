/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import Avatar from './Avatar'
import { UserContext } from '../context/UserContext'

const Chat = () => {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState({})
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [newMessageText, setNewMessageText] = useState('')
  const [messages, setMessages] = useState([])

  const { id } = useContext(UserContext)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000')
    setWs(ws)
    ws.addEventListener('message', handleMessage)
  }, [])

  const showOnlinePeople = (peopleArray) => {
    const people = {}
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username
    })
    setOnlinePeople(people)
  }

  function handleMessage(e) {
    const messageData = JSON.parse(e.data)
    console.log({ e, messageData })
    if ('online' in messageData) {
      showOnlinePeople(messageData.online)
    } else {
      console.log(messageData)
      setMessages((prev) => [...prev, { isOur: false, text: messageData.text }])
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
      })
    )
    setMessages((prev) => [...prev, { text: newMessageText }])
    setNewMessageText('')
  }

  const onlinePeopleExclOurUser = { ...onlinePeople }
  delete onlinePeopleExclOurUser[id]

  return (
    <div className='flex h-screen'>
      <div className='bg-white w-1/3 px-4 pt-4'>
        <div className='text-blue-600 text-xl font-bold flex items-center gap-2 mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path d='M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z' />
            <path d='M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z' />
          </svg>
          MernChat
        </div>

        {Object.keys(onlinePeopleExclOurUser).map((userId) => {
          return (
            <div
              onClick={() => setSelectedUserId(userId)}
              key={userId}
              className={`border-b border-gray-100 py flex items-center gap-2 cursor-pointer rounded-xl transition-all duration-300 ease-in-out ${
                userId === selectedUserId ? 'bg-blue-50' : ''
              }`}
            >
              <div
                className={`transition-all duration-300 rounded-r-md ease-out ${
                  selectedUserId === userId
                    ? 'h-11 ml-[2px] w-1 bg-blue-500'
                    : 'w-0 opacity-0 bg-transparent'
                }`}
              ></div>
              <div className='flex items-center gap-2 py-2 px-3'>
                <Avatar username={onlinePeople[userId]} userId={userId} />
                <span className='text-gray-800'>{onlinePeople[userId]}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col bg-blue-50 w-2/3 p-2'>
        <div className='flex-grow'>
          {!selectedUserId && (
            <div className='flex items-center h-full justify-center'>
              <span className='text-gray-300 text-lg'>
                &larr; Select a person from the sidebar
              </span>
            </div>
          )}
          {!!selectedUserId && (
            <div>
              {messages.map((message, idx) => {
                return <div key={idx}>{message.text}</div>
              })}
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className='flex items-center gap-2' onSubmit={sendMessage}>
            <input
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              type='text'
              placeholder='Type your message here'
              className='bg-white flex-grow border p-2'
            />
            <button type='submit' className='bg-blue-500 p-2 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Chat
