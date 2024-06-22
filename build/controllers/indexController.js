"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const encryptionService_1 = __importDefault(require("../service/encryptionService"));
const metodosUtilidad_1 = __importDefault(require("../util/metodosUtilidad"));
const database_1 = __importDefault(require("../database"));
const nodemailer = require('nodemailer');
class IndexController {
    index(req, res) {
        res.send("Hello JasrGamer, this is a texts");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.body;
            const { contraseña } = req.body;
            const encryptedContraseña = encryptionService_1.default.encrypt(contraseña);
            const administrador = yield database_1.default.query(`SELECT usuario, nombre, correo from users_admin WHERE usuario = "${usuario}" AND contraseña = "${encryptedContraseña}"`);
            if (administrador[0].length > 0) {
                res.send({ success: true, status: 1, message: "Administrador logueado exitosamente", administrador: administrador[0] });
            }
            else {
                const administrador = yield database_1.default.query(`SELECT * from users_admin WHERE usuario = ${usuario}`);
                if (administrador[0].length > 0) {
                    res.send({ success: true, status: 0, message: "Contraseña incorrecta." });
                }
                else {
                    res.send({ success: true, status: 0, message: "Usuario no existe." });
                }
            }
        });
    }
    recuperarContraseña(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.body;
            // Consulta para obtener el administrador por el usuario
            let administrador = yield database_1.default.query(`SELECT * FROM users_admin WHERE usuario = ${database_1.default.escape(usuario)}`);
            if (administrador[0].length > 0) {
                const contraseñaTemporal = metodosUtilidad_1.default.generarContraseñaTemporal();
                yield database_1.default.query(`UPDATE users_admin SET contraseña_temporal = '${contraseñaTemporal}' WHERE id = ${administrador[0][0].id}`);
                administrador = yield database_1.default.query(`SELECT * FROM users_admin WHERE usuario = ${database_1.default.escape(usuario)}`);
                // Configuración del transporte de correo con nodemailer
                const transport = nodemailer.createTransport({
                    host: "sandbox.smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "3fbd96805cf90d",
                        pass: "5cedc0c330b9d2"
                    }
                });
                // Opciones del correo electrónico
                const mailOptions = {
                    from: 'gym-billing@sw.com',
                    to: administrador[0][0].correo, // Usar el correo del administrador obtenido de la base de datos
                    subject: 'Recuperación de contraseña',
                    text: `Hola ${administrador[0][0].nombre}, aquí está tu nueva contraseña temporal: ${administrador[0][0].contraseña_temporal}`
                };
                // Enviar el correo electrónico
                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error al enviar el correo:", error);
                        res.status(500).send({ success: false, status: 0, message: "Error al enviar el correo." });
                    }
                    else {
                        console.log("Correo electrónico enviado:", info.response);
                        res.send({ success: true, status: 1, message: "Correo enviado correctamente." });
                    }
                });
            }
            else {
                res.send({ success: false, status: 0, message: "Usuario no encontrado." });
            }
        });
    }
}
exports.indexController = new IndexController();
