const checkDayRow = async (pool,date) => {
    try {
        const data = await pool.query(`SELECT date FROM positions WHERE date = DATE '${date}'`).then(data => data[0])
        return data[0]
    } catch(e){
        return console.log('Error at checkDayRow query', e)
    }
}

const addDay = async (pool,date) => {
    try {
        await pool.query(`INSERT INTO positions (date) VALUE ('${date}')`)
    } catch(e){
        return console.log('Error at addDay query', e)
    }
}

const findUserById = async (pool,user) => {
    try {
        const data = await pool.query(`SELECT * FROM users WHERE user_id = ${user}`).then(data => data[0])
        return data[0]
    } catch(e){
        return console.log('Error at findUserById query', e)
    }
}

const checkUserExist = async (pool,user) => {
    try {
        const data = await pool.query(`SELECT * FROM users WHERE user_id = ${user}`).then(data => data[0])
        return data[0] != undefined
    } catch(e){
        return console.log('Error at checkUserExist query', e)
    }
}

const saveMessageId = async (pool,ids) => {
    try {
        for(let id of ids) await pool.query(`INSERT INTO messages (id, message_id) VALUES (NULL, ${id})`)
    } catch(e){
        return console.log('Error at saveMessageId query', e)
    }
}

const getLastMessages = async pool => {
    try {
        const data = await pool.query(`SELECT message_id FROM messages`).then(data => data)
        return data[0]
    } catch(e){
        return console.log('Error at getLastMessages query', e)
    }
}

const deleteMessage = async (pool,id) => {
    try {
        await pool.query(`DELETE FROM messages WHERE message_id = ${id}`)
    } catch(e){
        return console.log('Error at deleteMessage query', e)
    }
}

const insertPosition = async (pool,position,count,day) => {
    console.log(position,count,day)
    let newCount
    try {
        const currentCount = await pool.query(`SELECT ${position} FROM positions WHERE date = date '${day}'`).then(data => data[0][0][position]) || 0
        newCount = Number(currentCount) + Number(count)
        await pool.query(`UPDATE positions SET ${position}=${newCount} WHERE date = date '${day}'`)
    } catch(e){
        return console.log('Error at insertPosition query', e)
    }
    return newCount
}

const checkPositionExist = async (pool,position) => {
    try {
        let data = await pool.query(`SELECT * FROM positions WHERE ${position}`).then(data => data)
        return data[0] != undefined
    } catch(e){
        return console.log(`Unknown column ${position}`)
    } 
}

const insertColumn = async (pool,column) => {
    try {
        return await pool.query(`ALTER TABLE positions ADD ${column} VARCHAR(50) NOT NULL AFTER date`)    
    } catch(e){
        return console.log('Error at insertColumn query', e)
    } 
}

const getPosition = async (pool,position,date) => {
    try {
        return await pool.query(`SELECT ${position} FROM positions WHERE date = date '${date}'`).then(data => data[0][0][position]) 
    } catch(e){
        return console.log('Error at getPosition query', e)
    } 
}

const getByDay = async (pool,date) => {
    try {
        return await pool.query(`SELECT * FROM positions WHERE date = date '${date}'`).then(data => data[0][0]) 
    } catch(e){
        return console.log('Error at getByDay query', e)
    } 
} 

module.exports.queryPool = {
    checkDayRow,
    addDay,
    findUserById,
    checkUserExist,
    saveMessageId,
    getLastMessages,
    deleteMessage,
    insertPosition,
    checkPositionExist,
    insertColumn,
    getPosition,
    getByDay
}