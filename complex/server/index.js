/** Express App Setup  */
const { PrismaClient } = require('@prisma/client')

const keys = require('./keys')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// const prisma = new PrismaClient()
// console.log('connecting to database...')
// prisma
//   .$connect()
//   .then(() => {
//     console.log('Connected to database')
//   })
//   .catch((error) => {
//     console.log('Error connecting to database', error)
//   })

// /** Redis Client Setup  */
// const redis = require('redis')
// const redisClient = redis.createClient({
//   host: keys.redisHost,
//   port: keys.redisPort,
//   retry_strategy: () => 1000,
// })
// const redisPublisher = redisClient.duplicate()

/** Express route handlers  */

app.get('/', (req, res) => {
  const random = Math.floor(Math.random() * 1000)
  console.log('app.get ~ random:', random)
  res.json({ message: 'Hi', random })
})

// app.get('/users/all', async (req, res) => {
//   console.log('app.get ~ users/all')
//   const users = await prisma.user.findMany()
//   res.json({ users })
// })

// app.post('/users/create', async (req, res) => {
//   console.log('app.post ~ users/create')
//   const random = Math.floor(Math.random() * 1000)
//   const user = await prisma.user.create({
//     data: { email: `test-${random}@test.com`, name: `test-${random}` },
//   })
//   res.json({ user })
// })

console.log('starttttttt', Math.floor(Math.random() * 1000))
app.get('/health/liveness', (req, res) => {
  res.send('OK')
})

app.get('/health/readiness', (req, res) => {
  res.send('OK')
})

// app.get('/values/current', async (req, res) => {
//   redisClient.hgetall('values', (err, values) => {
//     res.send(values)
//   })
// })

// app.post('/values', async (req, res) => {
//   const index = req.body.index

//   if (parseInt(index) > 40) {
//     return res.status(422).send('Index too high')
//   }

//   redisClient.hset('values', index, 'Nothing yet!')
//   redisPublisher.publish('insert', index)
//   pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

//   res.send({ working: true })
// })

app.listen(process.env.PORT || 3001, (err) => {
  console.log('Listening on port', process.env.PORT || 3001)
})
