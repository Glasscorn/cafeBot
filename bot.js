require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const { queryPool } = require('./query')
const { messages } = require('./messages')
const { logic } = require('./logic')
const { functions } = require('./functions')
const { sheetWare } = require('./sheetWare')

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on("polling_error", msg => console.log(msg))

bot.on('message', async msg => {

    if(msg.sticker) return

    const { id,is_bot,first_name,username,language_code } = msg.from

    console.log(id,first_name,username,msg.text)

    const user = await queryPool.findUser(id)

    if(msg.text.match('/auth')) return logic.registration(msg,bot)

    if(!user) return bot.sendMessage(id, messages.unknownUser(first_name))

    const today = functions.getToday()

    if(!await queryPool.checkToday(today)) await queryPool.setNewDay(today)

    switch(msg.text){
        case 'Назад': return logic.main_back(msg,user,bot)
        case 'Еще': return logic.main_more(msg,user,bot)
        case 'Отчет': return logic.dayReport(msg,user,bot)
        case 'Смотреть позиции': return logic.checkPositions(msg,user,bot)
        case 'Добавить позицию': return logic.addPosition(msg,user,bot)
        case 'Удалить позицию': return logic.deletePosition(msg,user,bot)
        case 'Ввести расход позиции': return logic.addPositionReduce(msg,user,bot)
        case 'Панель администратора': return logic.admin(msg,user,bot)
        case 'Добавить пользователя': return logic.addUser(msg,user,bot)
        case 'Удалить пользователя': return logic.deleteUser(msg,user,bot)
        case 'Написать пожелания': return logic.review(msg,user,bot)
        case 'Изменить роль пользователя': return logic.changeRole(msg,user,bot)
        default: return logic.main(msg,user,bot)
    }

})

module.exports = bot