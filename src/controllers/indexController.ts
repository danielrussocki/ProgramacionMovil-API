import { Request, Response } from 'express';

class IndexController {
    public index(req: Request, res: Response){
        res.json({msg: 'Bienvenido a la API de programación móvil'});
    }
}

export const indexController = new IndexController();