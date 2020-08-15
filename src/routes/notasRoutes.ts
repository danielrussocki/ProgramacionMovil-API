import { Router } from 'express';
import { notasController } from '../controllers/notasController';
import auth from '../commons/Auth';

class NotasRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(){
        this.router.get('/', auth.validateToken, notasController.getAllNotes);
        this.router.get('/:id', auth.validateToken, notasController.getNote);
        this.router.put('/:id', auth.validateToken, notasController.editSimpleNote);
        this.router.delete('/:id', auth.validateToken, notasController.deleteSimpleNote);
        this.router.post('/', auth.validateToken, notasController.createSimpleNote);
    }
}

const notasRoutes = new NotasRoutes();
export default notasRoutes.router;