const queryPool = require('./query')

class Controller {
    async getData(req,res){

        const [ periodStart,periodEnd ] = Object.values(req.query)
        console.log([ periodStart,periodEnd ])
        
        try {
            
            res.json({ periodStart,periodEnd })

        } catch(e){

            res.status(500)
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