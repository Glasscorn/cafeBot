const unknownUser = username => `Привет, ${username}, это рабочий бот. Я не смогу тебе ничего предложить 😰`
const helloToUser = username => `${username}, чем могу помочь?`
const addPositionReduce = () => 'Напиши позицию вот так:\n' + "`" + '/addPositionReduce ' + "`" + '\\<имя позиции\\> \\<расход\\>\nНажми на команду, чтобы скопировать'
const alertMissedPositionOrCount = (position,count) => `Кажется, неверная формула\nПозиция: ${position}\nКоличество: ${count}`
const more = () => 'Смотри ниже, что я могу'
const insertSuccesfull = (position,count) => `Теперь за сегодня расход позиции ${position} равен ${count}`
const positionInsertSuccesfull = position => `Позиция ${position} вставлена в список`
const position404 = position => `Позиции ${position} нету в списке. Сначала нужно добавить`
const addPositionNoArg = () => 'Напиши позицию вот так:\n' + "`" + '/addPosition ' + "`" + '\\<имя позиции\\>\nНажми на команду, чтобы скопировать'
const checkPositionNoArg = () => 'Напиши позицию вот так:\n' + "`" + '/checkPosition ' + "`" + '\\<имя позиции\\>\nНажми на команду, чтобы скопировать'
const positionFound = position => `Позиция ${position} уже есть в списке`
const positionCount = (position,count) => `Данные по позиции ${position} за сегодня: ${count}`
const dayReport = positions => {
    let message = 'Отчет за сегодня:\n'
    for(const position in positions){
        if(position != 'date') message += `${position.charAt(0).toUpperCase() + position.slice(1)}: ${positions[position] === '' ? 0 : positions[position]}\n`
    }
    return message
}

module.exports.messages = {
    unknownUser,
    helloToUser,
    addPositionReduce,
    alertMissedPositionOrCount,
    more,
    insertSuccesfull,
    positionInsertSuccesfull,
    position404,
    addPositionNoArg,
    checkPositionNoArg,
    positionFound,
    positionCount,
    dayReport
}