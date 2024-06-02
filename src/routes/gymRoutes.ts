import {Router}  from 'express'
import gymController from './../controllers/gymController';

class GymRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', gymController.list);
        this.router.get('/:id', gymController.getOne);
        this.router.post('/', gymController.create);
        this.router.put('/:id', gymController.update);
        this.router.delete('/:id', gymController.delete);
    }

}

const gymRoutes = new GymRoutes();
export default gymRoutes.router;