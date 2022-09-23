const pool = require('./db')

const setNewDay = async date => {
    try {
        return data = await pool.query(`INSERT INTO positions (date) VALUE ('${date}')`)
    } catch(e){
        return console.log('Error at setNewDay query', e)
    }
}

const checkStatus = async id => {
    try {
        const data = await pool.query(`SELECT status FROM users WHERE user_id = ${id}`).then(data => data[0][0])
        return data.status
    } catch(e){
        return console.log('Error at checkStatus query', e)
    }
}


const changeStatus = async (id,status) => {
    try {
        await pool.query(`UPDATE users SET status='${status}' WHERE user_id = ${id}`)
        console.log(`Статус юзера ${id} изменен на ${status}`)
    } catch(e){
        return console.log('Error at changeStatus query', e)
    }
}

const findUser = async user => {
    try {
        const data = await pool.query(`SELECT * FROM users WHERE user_id = ${user}`).then(data => data[0])
        return data[0]
    } catch(e){
        return console.log('Error at findUser query', e)
    }
}

const findPosition = async (key,date) => {
    try {
        const data = await pool.query(`SELECT ${key} FROM positions WHERE date = date ('${date}')`).then(data => data[0][0])
        return data
    } catch(e){
        console.log('Error at findPosition query')
        return false
    }
}

const addPosition = async position => {
    try {
        return await pool.query(`ALTER TABLE positions ADD ${position} VARCHAR(50) NOT NULL DEFAULT '0' AFTER date`)    
    } catch(e){
        return console.log('Error at addPosition query', e)
    } 
}

const addPositionReduce = async (key,value,date) => {
    try {
        await pool.query(`UPDATE positions SET ${key}='${value}' WHERE date = date ('${date}')`)
        console.log(`Вставлена в таблицу позиция ${key} ${value}`)
    } catch(e){
        return console.log('Error at addPositionReduce query')
    }
}


const checkToday = async date => {
    try {
        const data = await pool.query(`SELECT date FROM positions WHERE date = date '${date}'`).then(data => data[0][0])
        return data
    } catch(e){
        return console.log('Error at checkDayRow query', e)
    }
}

const getDataByDay = async date => {
    try {
        const data = await pool.query(`SELECT * FROM positions WHERE date = date '${date}'`).then(data => data[0])
        return data
    } catch(e){
        return console.log('Error at getDataByDay query', e)
    }
}

const getDataByPeriod = async (periodStart,periodEnd) => {
    try {
        const data = await pool.query(`SELECT * FROM positions WHERE date BETWEEN date '${periodStart}' AND date '${periodEnd}'`).then(data => data[0])
        return data
    } catch(e){
        return console.log('Error at getDataByPeriod query', e)
    }
}

const setNewUser = async (username,key) => {
    try {
        return data = await pool.query(`INSERT INTO new_users (username,user_key) VALUES ('${username}','${key}')`)
    } catch(e){
        return console.log('Error at setNewUser query', e)
    }
}

const findNewUser = async username => {
    try {
        const data = await pool.query(`SELECT * FROM new_users WHERE username = '${username}'`).then(data => data[0][0])
        return data
    } catch(e){
        return console.log('Error at findNewUser query', e)
    }
}

const logUpUser = async id => {
    try {
        return data = await pool.query(`INSERT INTO users (user_id) VALUE ('${id}')`)
    } catch(e){
        return console.log('Error at setNewUser query', e)
    }
}

const deleteNewUser = async username => {
    try {
        return data = await pool.query(`DELETE FROM new_users WHERE username = '${username}'`)
    } catch(e){
        return console.log('Error at deleteNewUser query', e)
    }
}

module.exports.queryPool = {
    setNewDay,
    checkStatus,
    changeStatus,
    findUser,
    addPosition,
    addPositionReduce,
    findPosition,
    checkToday,
    getDataByDay,
    getDataByPeriod,
    setNewUser,
    findNewUser,
    logUpUser,
    deleteNewUser
}