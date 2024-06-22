import express, {Application}  from 'express'
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import GymRoutes from './routes/gymRoutes';


class Serve {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev')); // para ver que servicios se estan consumiendo
        this.app.use(cors()); // para realizar las peticiones desde angular
        this.app.use(express.json()); // Con esto entienden los json en los request como en las respuestas. 
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/api/gym', indexRoutes);
        this.app.use('/api/gym/gettable', GymRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'))
        })
    }

}

const server = new Serve();
server.start()