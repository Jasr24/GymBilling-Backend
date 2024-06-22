"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gymRoutes_1 = __importDefault(require("./routes/gymRoutes"));
class Serve {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev')); // para ver que servicios se estan consumiendo
        this.app.use((0, cors_1.default)()); // para realizar las peticiones desde angular
        this.app.use(express_1.default.json()); // Con esto entienden los json en los request como en las respuestas. 
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/gym', indexRoutes_1.default);
        this.app.use('/api/gym/gettable', gymRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
const server = new Serve();
server.start();
