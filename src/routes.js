
class Routes{
    constructor(app){
        this.app = app;
    }

    initializeRoutes(){
        this.app.post('/client',(req, res)=>{

            res.json({id: 1, name: 'Joesss'})
        })
    }
}

module.exports = Routes;