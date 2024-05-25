const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const User = require('./models/User.js')
const cookieParser = require('cookie-parser')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) throw err

    res.json(userData)
  })
  try {
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const createdUser = await User.create({ username, password })
    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err
        res.cookie('token', token).status(201).json({ _id: createdUser._id })
      }
    )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.listen(4000, () => {
  console.log('Server running')
})
