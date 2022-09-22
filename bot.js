require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const { queryPool } = require('./query')
const { messages } = require('./messages')
const { logic } = require('./logic')
const { functions } = require('./functions')

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on("polling_error", msg => console.log(msg))

bot.on('message', async msg => {

    const { id,is_bot,first_name,username,language_code } = msg.from

    console.log(msg)

    const user = await queryPool.findUser(id)

    const today = functions.getToday()

    if(!user) return bot.sendMessage(id, messages.unknownUser(first_name))

    if(!await queryPool.checkToday(today)) await queryPool.setNewDay(today)

    switch(msg.text){
        case 'Назад': return logic.main_back(msg,user,bot)
        case 'Еще': return logic.main_more(msg,user,bot)
        case 'Отчет': return logic.dayReport(msg,user,bot)
        case 'Добавить позицию': return logic.addPosition(msg,user,bot)
        case 'Ввести расход позиции': return logic.addPositionReduce(msg,user,bot)
        case 'Панель администратора': return logic.admin(msg,user,bot)
        case 'Добавить пользователя': return logic.addUser(msg,user,bot)
        case 'Удалить пользователя': return logic.deleteUser(msg,user,bot)
        default: return logic.main(msg,user,bot)
    }

})

module.exports = bot