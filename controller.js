const { functions } = require('./functions')
const { queryPool } = require('./query')
const { sheetWare } = require('./sheetWare')

class Controller {
    async getData(req,res){

        let [ lastColumn ] = Object.values(req.query)
        
        try {

            const data = await queryPool.getAllData()

            let headers = Object.keys(data[0])
            let result = []

            for(const row of data) {
             
                functions.setMidnight(row.date)
                
                row.date = `${row.date.getDate()}.${row.date.getMonth()+1}.${row.date.getFullYear()}`

                result.push(Object.values(row))

            }

            result.unshift(headers)
            console.table(result)

            await sheetWare.setData(result,lastColumn)

            res.status(200).send(true)

        } catch(e){

            console.log(e)

            res.status(500).json({
                status: 500,
                error: 'Invalid query'
            })

        }

    }

    async setData(req,res){

        const request = req.query

        try {

            // res.send([[request.request,request.argument]])
            res.json(request)

        } catch(e){

            res.status(500)

        }

    }

    async ping(req,res){

        res.status(200).json(true)

    }

}

module.exports = new Controller