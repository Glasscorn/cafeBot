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

    let invalidPositions = []
    let existPositions = []
    let positions = []

    for(const position of request){

        if(position.match(/[0-9,.!@#$%^&*()/|\\]/gi)) invalidPositions.push(position)

        if(!await queryPool.findPosition(position,today)){

            positions.push(position)

            await queryPool.addPosition(position)

        } else existPositions.push(position)

    }

    let reply = existPositions.length === positions.length ? 'Все позиции уже существуют ❌\n\n' : 'Успешно вставлены позиции ✅\n\n'

    positions.forEach(el => {
        if(invalidPositions.includes(el)) reply += `Позиция '${el}' не валидная\n`
        if(existPositions.includes(el)) reply += `Позиция '${el}' уже существует\n`
        else reply += `Позиция '${el}' вставлена\n`
    })

    if(invalidPositions[0]) reply += '\nПозиции не должны содержать цифр и спец символов'

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

module.exports.handlers = {
    main,
    main_more,
    addPosition,
    addPositionReduce,
    
}