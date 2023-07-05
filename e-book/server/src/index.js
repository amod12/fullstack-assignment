const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);

const cors = require('cors')
const connect = require('./db/connect')
const usersRouter = require('./routes/usersRouter')


app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use(usersRouter);


connect()


server.listen(3007, () => {
  console.log(`Example app listening on port 3007`)
})
