const pool = require('./db')

const { queryPool } = require('./query')
const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { functions } = require('./functions')

const addPositionReduceNoArg = (id,bot) => bot.sendMessage(id,messages.addPositionReduce(),{
    reply_markup: {
        keyboard: keyboards.backKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true
    },
    parse_mode: 'MarkdownV2'
})

const sendMoreKeyboard = (id,bot) => bot.sendMessage(id,messages.more(),{
    reply_markup: {
        keyboard: keyboards.moreKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true
    },
})

const addPositionReduce = async (id,bot,query) => {
    if(!query.position || !query.count) return bot.sendMessage(id,messages.alertMissedPositionOrCount(query.position,query.count),{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    if(!await queryPool.checkPositionExist(pool,query.position)) return bot.sendMessage(id,messages.position404(query.position),{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    const count = await queryPool.insertPosition(pool,query.position,query.count,query.day)
    return bot.sendMessage(id,messages.insertSuccesfull(query.position,count),{
        reply_markup: {
            keyboard: keyboards.userKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

const addPositionNoArg = (id,bot) => bot.sendMessage(id,messages.addPositionNoArg(),{
    reply_markup: {
        keyboard: keyboards.moreKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true
    },
    parse_mode: 'MarkdownV2'
})

const checkPositionNoArg = (id,bot) => bot.sendMessage(id,messages.checkPositionNoArg(),{
    reply_markup: {
        keyboard: keyboards.moreKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true
    },
    parse_mode: 'MarkdownV2'
})

const addPosition = async (id,bot,query) => {
    if(!query.position) return
    if(await queryPool.checkPositionExist(pool,query.position)) return bot.sendMessage(id,messages.positionFound(query.position),{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    else {
        await queryPool.insertColumn(pool,query.position)
        return bot.sendMessage(id,messages.positionInsertSuccesfull(query.position),{
            reply_markup: {
                keyboard: keyboards.userKeyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    } 
}

const checkPosition = async (id,bot,query) => {
    console.log(query)
    if(!await queryPool.checkPositionExist(pool,query.position)) return bot.sendMessage(id,messages.position404(query.position),{
        reply_markup: {
            keyboard: keyboards.backKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
    else {
        const count = await queryPool.getPosition(pool,query.position,query.day)
        return bot.sendMessage(id,messages.positionCount(query.position,count),{
            reply_markup: {
                keyboard: keyboards.backKeyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            }
        })
    }
}

const dayRespond = async (id,bot) => {
    const day = functions.getToday()
    const data = await queryPool.getByDay(pool,day)
    return bot.sendMessage(id,messages.dayReport(data),{
        reply_markup: {
            keyboard: keyboards.userKeyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

module.exports.textCommands = {
    'Ввести расход позиции': addPositionReduceNoArg,
    'Еще': sendMoreKeyboard,
    'Добавить позицию': addPositionNoArg,
    'Посмотреть позицию': checkPositionNoArg,
    'Отчет за сегодня': dayRespond
}

module.exports.botCommands = {
    '/addPositionReduce': addPositionReduce,
    '/addPosition': addPosition,
    '/checkPosition': checkPosition
}