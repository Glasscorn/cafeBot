const getToday = () => {
    let date = new Date()

    date.setHours(3)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2)
    
    return date
}
const deletePosition = () => {
    console.log('deletePosition')
}
const sendMoreKeyboard = () => {
    console.log('sendMoreKeyboard')
}

module.exports.functions = {
    getToday,
    deletePosition,
    sendMoreKeyboard

}