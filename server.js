const express = require('express')
const bot = require('./bot')

const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () => console.log(`App started at ${PORT}`))