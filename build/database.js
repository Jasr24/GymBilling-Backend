"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const mysql = require('mysql2/promise');
const pool = mysql.createPool(keys_1.default.database);
pool.getConnection()
    .then(conn => {
    console.log('Conectado a la base de datos');
    conn.release();
})
    .catch(err => {
    console.error('Error conectando a la base de datos:', err);
});
exports.default = pool;
