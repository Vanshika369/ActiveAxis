const express = require('express');
const cors = require('cors')
const process = require('process')
const connectDB = require("./util/db")

console.log('Connecting to DB...')
connectDB()

const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

app.use('/', require('./util/router'))

const server = app.listen(PORT, () => {
    console.log(`App is now running on port ${PORT}...`)
})