import {Request, Response}  from 'express'

class IndexController {


    public index (req: Request, res: Response) {
        res.send("Hello JasrGamer, this is a texts")
    }
    
}

export const indexController = new IndexController();