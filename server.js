const express = require('express')
const bodyParser = require('body-parser')

const router = require('./server/router')
const bot = require('./bot')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(PORT, () => console.log(`App started at ${PORT}`))