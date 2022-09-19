require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const pool = require('./db')

const { queryPool } = require('./query')
const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { textCommands } = require('./commands')
const { botCommands } = require('./commands')
const { functions } = require('./functions')

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on('message', async msg => {

    let today = functions.getToday()

    if(!await queryPool.checkDayRow(pool,today)) await queryPool.addDay(pool,today) // Check for today date row in db

    const { id,first_name,username,type } = msg.chat
    
    if(!await queryPool.checkUserExist(pool,id)) return bot.sendMessage(id, messages.unknownUser(first_name)) // Check for user in userlist in db
    
    const message_text = msg.text

    let botMessage

    try {
        if(msg.entities){
            const [command,position,count] = message_text.split(' ')
            if(botCommands[command]) await botCommands[command](id,bot,{
                position: position,
                count: count,
                day: today
            })
        }
        if(textCommands[message_text]) botMessage = textCommands[message_text](id,bot).then(data => data)
        else botMessage = await bot.sendMessage(id,messages.helloToUser(first_name), {
            reply_markup: {
                keyboard: keyboards.userKeyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }).then(data => data)
    } catch(e){
        console.log('Error at bot.js file', e)
    }

    const message_id = msg.message_id

    // const botMessage_id = botMessage.message_id

    // try {
    //     const messagesPool = await queryPool.getLastMessages(pool)

    //     await queryPool.saveMessageId(pool,[message_id,botMessage_id])

    //     if(messagesPool.length >= 3)
    //     for(let i = 0; i < messagesPool.length-1; i++) {
    //         await bot.deleteMessage(id,messagesPool[i].message_id)
    //         await queryPool.deleteMessage(pool,messagesPool[i].message_id)
    //     }

    // } catch(e){
    //     console.log(e)
    // }

})
    

// bot.on('callback_query', async msg => {
//     const { id,first_name,username,type } = msg.message.chat
//     if(!await queryPool.checkUserExist(pool,id)) return bot.sendMessage(id, messages.unknownUser(first_name))
//     const callback_data = msg.data
//     return callbacks[callback_data]()
// })

module.exports = bot