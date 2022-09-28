const getToday = () => {

    let date = new Date()

    date.setHours(3)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    date = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2)

    return date

}

const getLastMonth = () => {

    let periodStart = new Date()    
    let periodEnd = getToday()

    let currentMonth = periodStart.getMonth()+1

    periodStart.setMonth(currentMonth-1)
    periodStart.setHours(3)
    periodStart.setMinutes(0)
    periodStart.setSeconds(0)
    periodStart.setMilliseconds(0)

    periodStart = periodStart.getFullYear() + '-' +
    ('00' + (periodStart.getMonth())).slice(-2) + '-' +
    ('00' + periodStart.getDate()).slice(-2)
    
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

    periodStart = periodStart.getFullYear() + '-' +
    ('00' + (periodStart.getMonth()+1)).slice(-2) + '-' +
    ('00' + periodStart.getDate()).slice(-2)
    
    return { periodStart,periodEnd }

}

const getDay = day => day.split('.').reverse().join('-')

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const toReadableData = date => `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}.${date.getFullYear()}`

const setMidnight = date => {
    date.setHours(3)
    return date
}

const timeToDate = time => {
    let date = new Date(time)
    return date
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports.functions = {
    getLastMonth,
    getLastWeek,
    getToday,
    getDay,
    capitalize,
    toReadableData,
    setMidnight,
    timeToDate,
    timeout
}