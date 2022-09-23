require('dotenv').config()

const Router = require('express')

const Controller = require('./controller.js')

const router = new Router()

const API_KEY = process.env.API_KEY

router.get(`/api/${API_KEY}/getData`, Controller.getData)
router.post(`/api/${API_KEY}/setData`, Controller.setData)

module.exports = router