require('dotenv').config()

const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { queryPool } = require('./query')
const { handlers } = require('./handlers')
const { functions } = require('./functions')

const main = async (msg,user,bot) => {

    const status = await queryPool.checkStatus(msg.from.id)

    switch(status){
        case 'addPositionReduce': return handlers.addPositionReduce(msg,user,bot)
        case 'addPosition': return handlers.addPosition(msg,user,bot)
        case 'deletePosition': return handlers.deletePosition(msg,user,bot)
        case 'dayReport': return handlers.dayReport(msg,user,bot)
        case 'addUser': return handlers.addUser(msg,user,bot)
        case 'deleteUser': return handlers.deleteUser(msg,user,bot)
        case 'review': return handlers.review(msg,user,bot)
        case 'changeRole': return handlers.changeRole(msg,user,bot)
        default: return handlers.main(msg,user,bot)
    }

}

const main_back = async (msg,user,bot) => handlers.main(msg,user,bot)

const main_more = async (msg,user,bot) => handlers.main_more(msg,user,bot)

const checkPositions = async (msg,user,bot) => handlers.checkPositions(msg,user,bot)

const addPosition = async (msg,user,bot) => {

    const status = 'addPosition'

    await queryPool.changeStatus(msg.from.id,status)

    const data = await queryPool.checkPositions()

    let reply = messages.addPosition

    data.forEach((el,i) => reply += i === 0 ? '' : i === data.length-1 ? `${functions.capitalize(el.COLUMN_NAME)}\n` : `${functions.capitalize(el.COLUMN_NAME)},\n`)


    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    
}

const deletePosition = async (msg,user,bot) => {

    const status = 'deletePosition'

    await queryPool.changeStatus(msg.from.id,status)

    const data = await queryPool.checkPositions()

    let reply = messages.deletePosition

    data.forEach((el,i) => reply += i === 0 ? '' : i === data.length-1 ? `${functions.capitalize(el.COLUMN_NAME)}\n` : `${functions.capitalize(el.COLUMN_NAME)},\n`)


    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
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

    const status = 'addUser'

    await queryPool.changeStatus(msg.from.id,status)

    const user_list = (await queryPool.userList()).map(user => [user.username.toLowerCase()])

    let reply = messages.addUser()

    reply += user_list.map(user => `@${user}${user == 'orgibeelaris' ? ' - Создатель\n' : `\n`}`)
    reply = reply.replace(/,/g,'')

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const deleteUser = async (msg,user,bot) => {
    
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

    const status = 'deleteUser'

    await queryPool.changeStatus(msg.from.id,status)

    const user_list = (await queryPool.userList()).map(user => user.username.toLowerCase())

    let reply = messages.deleteUser()

    reply += user_list.map(user => `@${user}${user == 'orgibeelaris' ? ' - Создатель\n' : '\n'}`)
    reply = reply.replace(/,/g,'')

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const review = async (msg,user,bot) => {
    
    const status = 'review'

    await queryPool.changeStatus(msg.from.id,status)

    const reply = messages.review()
    const keyboard = keyboards.backKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const registration = async (msg,bot) => {

    const user_list = (await queryPool.userList()).map(user => user.username.toLowerCase())

    if(!user_list.includes(msg.from.username.toLowerCase())) return bot.sendMessage(msg.from.id,'Я не могу тебя зарегистрировать(')

    await queryPool.addId(msg.from.username.toLowerCase(),msg.from.id)

    const reply = `Привет, ${msg.from.first_name}, теперь ты можешь со мной работать. Приятно познакомиться 😊`
    const keyboard = keyboards.mainKeyboard

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}

const changeRole = async (msg,user,bot) => {

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

    const status = 'changeRole'

    await queryPool.changeStatus(msg.from.id,status)

    const user_list = (await queryPool.userList()).map(user => [user.username.toLowerCase(),user.role])

    console.log(user_list)

    let reply = messages.changeRole()

    reply += user_list.map(user => `@${user[0]} - ${user[0] == 'orgibeelaris' ? 'Создатель\n' : `${user[1]}\n`}`)
    reply = reply.replace(/,/g,'')

    return bot.sendMessage(msg.chat.id,reply,{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
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
    deletePosition,
    addPositionReduce,
    checkPositions,
    dayReport,
    admin,
    addUser,
    deleteUser,
    review,
    registration,
    changeRole
}