const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { queryPool } = require('./query')
const { handlers } = require('./handlers')

const main = async (msg,user,bot) => {

    const status = await queryPool.checkStatus(msg.from.id)

    switch(status){
        case 'addPositionReduce': return handlers.addPositionReduce(msg,user,bot)
        case 'addPosition': return handlers.addPosition(msg,user,bot)
        default: return handlers.main(msg,user,bot)
    }

}

const main_back = async (msg,user,bot) => handlers.main(msg,user,bot)

const main_more = async (msg,user,bot) => handlers.main_more(msg,user,bot)

const addPosition = async (msg,user,bot) => {

    const status = 'addPosition'

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.addPosition()
    const keyboard = keyboards.backKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    
}

const addPositionReduce = async (msg,user,bot) => {

    const status = 'addPositionReduce'

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.addPositionReduce()
    const keyboard = keyboards.backKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}


module.exports.logic = {
    main,
    main_back,
    main_more,
    addPosition,
    addPositionReduce
}