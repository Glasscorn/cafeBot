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

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

module.exports.functions = {
    getToday,
    capitalize
}