"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // Corriendolo localmente
    // database: {
    //     host: 'localhost',
    //     user: 'root',
    //     password: '123456',
    //     database: 'gymbilling',
    //     port: 3306
    // }
    //Corriendolo completo con el contenedor, Ojo esta es otra base de datos la cual en MySQL la encontramos en el puerto 3307
    database: {
        host: 'mysqldb',
        user: 'root',
        password: '123456',
        database: 'gymbilling',
        port: 3306
    }
};
