const { functions } = require('./functions')
const { messages } = require('./messages')
const { keyboards } = require('./keyboards')
const { queryPool } = require('./query')

const main = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main')

    const reply = messages.hello(user.role)
    const keyboard = keyboards.mainKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const main_more = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main_more')

    const reply = messages.more(user.role)
    const keyboard = keyboards.moreKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const addPosition = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main')

    const request = msg.text.trim().split(',')

    const today = functions.getToday()

    let position_obj = {}

    for(const position of request){

        if(position.match(/[0-9,.!@#$%^&*()/|\\]/gi)) position_obj[position] = 'invalid'

        else if(!await queryPool.findPosition(position,today)){

            position_obj[position] = 'valid'

            await queryPool.addPosition(position)

        } else position_obj[position] = 'exist'

    }

    let reply = 'Вот что у меня получилось:\n\n'

    for(const position in position_obj){

        reply += position_obj[position] === 'invalid' ? `Позиция '${position}' не валидная ❌\n`
        : position_obj[position] === 'exist' ? `Позиция '${position}' уже существует ❌\n`
        : `Позиция '${position}' успешно вставлена ✅\n`

    }

    if(Object.values(position_obj).indexOf('invalid') > -1) reply += '\n❗️Позиции не должны содержать цифр и спец символов❗️'

    const keyboard = keyboards.mainKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const addPositionReduce = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main')

    const request_params = msg.text.trim().split(',').map(el => el.split(' ').filter(el => el))

    const date = functions.getToday()

    let request = {}
    let missedPositions = []

    for(const product of request_params){

        const key = isNaN(Number(product[0])) ? product[0] : product[1]
        const value = isNaN(Number(product[0])) ? product[1] : product[0]

        request[key] = Number(value)

        const currentValue = await queryPool.findPosition(key,date)

        if(!currentValue) missedPositions.push(key)

        request[key] += Number(currentValue[key])

        await queryPool.addPositionReduce(key,request[key],date)

    }

    let reply = Object.keys(request).length === missedPositions.length ? 'Позиции не были найдены ❌\n\n' : 'Позиции успешно вставлены ✅\n\n'

    for(const key in request){
        if(!missedPositions.includes(key)) reply += `'${functions.capitalize(key)}' теперь: ${request[key]}\n`
        else reply += `Позицию '${key}' не удалось найти\n`
    }

    if(missedPositions[1]) reply += '\nНе найденные позиции нужно сначала добавить'
    else if(missedPositions[0]) reply += '\nНе найденную позицию нужно сначала добавить'

    const keyboard = keyboards.mainKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const dayReport = async (msg,user,bot) => {

    let request

    switch(msg.text){
        case 'Месяц': request = functions.getLastMonth(); break
        case 'Неделя': request = functions.getLastWeek(); break
        case 'Сегодня': request = functions.getToday(); break
        default: break
    }

    if(!request){

        request = {}

        const request_params = msg.text.split(' ').filter(el => el)

        if(request_params.length === 2){

            request.periodStart = functions.getDay(request_params[0])
            request.periodEnd = functions.getDay(request_params[1])

        }

        if(request_params.length === 1) request.period = functions.getDay(request_params[0])
    
    }

    await queryPool.changeStatus(msg.from.id,'main')

    let data = []

    let reply = 'Вот что удалось найти\n\n\n'

    if(request.hasOwnProperty(['period'])){

        data = await queryPool.getDataByDay(request.period)

    } else if(request.hasOwnProperty(['periodStart'])){

        data = await queryPool.getDataByPeriod(request.periodStart,request.periodEnd)

    }

    if(data[0]) data.forEach(day => {

        for(const position in day){

            if(position === 'date'){

                reply += `За ${functions.toReadableData(day[position])} списания:\n`

            } else {

                if(Number(day[position]) > 0) reply += `${functions.capitalize(position)}: ${day[position]}\n`

            }

        }

        reply +=  '\n'

    })

    else reply = 'Ничего не удалось найти, прости 😰'

    const keyboard = keyboards.mainKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const review = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main')

    const CREATOR_TELEGRAM_ID = process.env.CREATOR_TELEGRAM_ID
    const CREATOR_TELEGRAM_USERNAME = process.env.CREATOR_TELEGRAM_USERNAME

    let reply = 'Отправила разработчику. Скоро он выйдет на связь!'
    const keyboard = keyboards.mainKeyboard

    if(CREATOR_TELEGRAM_ID){
        
        const reply = `Пришло сообщение от @${msg.from.username}\n\n${msg.text}`

        bot.sendMessage(CREATOR_TELEGRAM_ID,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

    } else reply = `Что-то пошло не так, можешь отправить сообщение сюда @${CREATOR_TELEGRAM_USERNAME}`
    
    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}

const addUser = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'main')

    let username = msg.text

    username = username.trim().replace('@','')

    const user_key = functions.generateKey()

    await queryPool.setNewUser(username,user_key)

    const reply = `Пользователь @${username} добавлен успешно. Теперь он может работать со мной\n\nЧтобы активировать меня, он должен написать мне команду ниже (нажми, чтобы скопировать)`
    const command = "`" + '/auth ' + user_key +"`"
    const keyboard = keyboards.mainKeyboard

    await bot.sendMessage(msg.from.id,reply,{
        reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

    return bot.sendMessage(msg.from.id,command,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    },
                    parse_mode: 'MarkdownV2'
                })

}

const deleteUser = async (msg,user,bot) => {

    await queryPool.changeStatus(msg.from.id,'admin')

    const keyboard = keyboards.adminKeyboard

    return bot.sendMessage(msg.from.id,reply,{
                    reply_markup: {
                        keyboard: keyboard,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                })

}



module.exports.handlers = {
    main,
    main_more,
    addPosition,
    addPositionReduce,
    dayReport,
    review,
    addUser,
    deleteUser,
}