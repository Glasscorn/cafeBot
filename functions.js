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

const getLastMonth = () => {

    let periodEnd = getToday()
    let periodStart = new Date()

    let currentMonth = periodStart.getUTCMonth()+1

    periodStart.setMonth(currentMonth-1)
    periodStart.setHours(3)
    periodStart.setMinutes(0)
    periodStart.setSeconds(0)
    periodStart.setMilliseconds(0)

    periodStart = periodStart.getUTCFullYear() + '-' +
    ('00' + (periodStart.getUTCMonth())).slice(-2) + '-' +
    ('00' + periodStart.getUTCDate()).slice(-2)
    
    return { periodStart,periodEnd }

}

const getLastWeek = () => {

    let periodEnd = getToday()
    let periodStart = new Date()

    let currentDate = periodStart.getDate()

    periodStart.setDate(currentDate-7)
    periodStart.setHours(3)
    periodStart.setMinutes(0)
    periodStart.setSeconds(0)
    periodStart.setMilliseconds(0)

    periodStart = periodStart.getUTCFullYear() + '-' +
    ('00' + (periodStart.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + periodStart.getUTCDate()).slice(-2)
    
    return { periodStart,periodEnd }

}

const getDay = day => day.split('.').reverse().join('-')

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const toReadableData = date => `${String(date.getUTCDate()+1).padStart(2,'0')}.${String(date.getUTCMonth()+1).padStart(2,'0')}.${date.getUTCFullYear()}`

module.exports.functions = {
    getLastMonth,
    getLastWeek,
    getToday,
    getDay,
    capitalize,
    toReadableData,
}