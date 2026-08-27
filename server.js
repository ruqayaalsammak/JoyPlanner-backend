const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])


const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT ? process.env.PORT : "3000"

const authCtrl = require('./controllers/auth')
const usersCtrl = require('./controllers/users')
const eventCtrl = require('./controllers/events')
const tasksCtrl = require('./controllers/tasks')
const verifyToken = require('./middleware/verify-token')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 🥭`)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Event Roures
// app.get('/auth/sign-token', authCtrl.signToken)
// app.get('/auth/verify-token', authCtrl.verifyToken)
app.post('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-in', authCtrl.signIn)
app.post('/events', verifyToken, eventCtrl.create)
app.get('/events', verifyToken, eventsCtrl.index)
app.get('/events/:eventId', verifyToken, eventCtrl.show)
app.put('/events/:eventId', verifyToken, eventCtrl.update)
app.delete('/events/:eventId', verifyToken, eventCtrl.deleteEvent)
app.post('/events/:eventId/tasks', verifyToken, tasksCtrl.create)
app.get('/events/:eventId/tasks/:taskId', verifyToken, tasksCtrl.index)
app.put('/events/:eventId/tasks/:taskId', verifyToken, tasksCtrl.update)
app.delete('/events/:eventId/tasks/:taskId', verifyToken, tasksCtrl.deleteTask)


app.get('/users', verifyToken, usersCtrl.index)

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}! 😀`)
})
