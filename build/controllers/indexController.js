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
const database_1 = __importDefault(require("../database"));
class IndexController {
    index(req, res) {
        res.send("Hello JasrGamer, this is a texts");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.body;
            const { contraseña } = req.body;
            const encryptedContraseña = encryptionService_1.default.encrypt(contraseña);
            const administrador = yield database_1.default.query(`SELECT usuario, correo from users_admin WHERE usuario = "${usuario}" AND contraseña = "${encryptedContraseña}"`);
            if (administrador[0].length > 0) {
                res.send({ message: "Administrador logueado exitosamente", administrador: administrador[0] });
            }
            else {
                const administrador = yield database_1.default.query(`SELECT * from users_admin WHERE usuario = ${usuario}`);
                if (administrador[0].length > 0) {
                    res.send({ message: "Contraseña incorrecta." });
                }
                else {
                    res.send({ message: "Usuario no existe." });
                }
            }
        });
    }
}
exports.indexController = new IndexController();
