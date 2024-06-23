import {Router}  from 'express'
import { indexController } from './../controllers/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', indexController.index);
        this.router.post('/login', indexController.login);
        this.router.post('/recuperar/password', indexController.codigoRecuperarContraseña);
        this.router.post('/cambiar/password', indexController.cambiarContraseñacodigo);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;