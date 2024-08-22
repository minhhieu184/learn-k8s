const keys = require('./keys')

/** Express App Setup  */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const random = Math.floor(Math.random() * 10)
console.log('random22:', random)

/** Postgres Client Setup  */
const { Pool } = require('pg')
const pgClient = new Pool({
  // user: keys.pgUser,
  // host: keys.pgHost,
  // database: keys.pgDatabase,
  // password: keys.pgPassword,
  // port: keys.pgPort,
  connectionString: 'postgres://db_user:db_pass@postgres-cluster-ip-service.default.svc.cluster.local:15432/db_name',
  connectionTimeoutMillis: 10000,
})

pgClient.on('error', () => console.log('Lost PG connection'))
;(async () => {
  try {
    const ss = await pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    console.log('ss:', ss)
  } catch (error) {
    console.log('; ~ error:', error)
  }
})()

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
  console.log('app.get ~ random:', random)
  res.json({ message: 'Hi', random })
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values')
  console.log('app.get ~ values:', values)

  res.json({ values: 'all' })
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

app.listen(5000, (err) => {
  console.log('Listening')
})
