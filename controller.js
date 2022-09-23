const queryPool = require('./query')

class Controller {
    async getData(req,res){
        const request = req.query
        console.log(request)
        try {
            // res.send([[request.request,request.argument]])
            res.json(request)
        } catch(e){
            res.status(500)
        }
    }
    async setData(req,res){
        const request = req.query
        console.log(req.body)
        try {
            // res.send([[request.request,request.argument]])
            res.json(request)
        } catch(e){
            res.status(500)
        }
    }
}

module.exports = new Controller