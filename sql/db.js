require('dotenv').config()
const mysql2 = require('mysql2/promise')

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

module.exports = pool