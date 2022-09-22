const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { queryPool } = require('./query')
const { handlers } = require('./handlers')

const main = async (msg,user,bot) => {

    const status = await queryPool.checkStatus(msg.from.id)

    switch(status){
        case 'addPositionReduce': return handlers.addPositionReduce(msg,user,bot)
        case 'addPosition': return handlers.addPosition(msg,user,bot)
        case 'dayReport': return handlers.dayReport(msg,user,bot)
        case 'addUser': return handlers.addUser(msg,user,bot)
        case 'deleteUser': return handlers.deleteUser(msg,user,bot)
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

const dayReport = async (msg,user,bot) => {

    const status = 'dayReport'

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.dayReport()
    const keyboard = keyboards.reportKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const admin = async (msg,user,bot) => {

    console.log(user)

    const status = 'admin'

    if(user.role === 'admin') await queryPool.changeStatus(msg.from.id,status)
    else return bot.sendMessage(msg.chat.id,messages.notAdmin(),{
        reply_markup: {
            keyboard: keyboards.mainKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

    const reply = messages.admin()
    const keyboard = keyboards.adminKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const addUser = async (msg,user,bot) => {

    const status = 'addUser'

    if(user.role !== 'admin'){

        await queryPool.changeStatus(msg.from.id,'main')

        return bot.sendMessage(msg.chat.id,messages.unavailableCommand(),{
        reply_markup: {
            keyboard: keyboards.mainKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

    }

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.addUser()
    const keyboard = keyboards.backKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const deleteUser = async (msg,user,bot) => {

    const status = 'deleteUser'
    
    if(user.role !== 'admin'){

        await queryPool.changeStatus(msg.from.id,'main')

        return bot.sendMessage(msg.chat.id,messages.unavailableCommand(),{
        reply_markup: {
            keyboard: keyboards.mainKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

    }

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.deleteUser()
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
    addPositionReduce,
    dayReport,
    admin,
    addUser,
    deleteUser,
}