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
const database_1 = __importDefault(require("../database"));
class GymController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = req.query;
            var data = "";
            console.log(table);
            if (table == "clientes") {
                data = yield database_1.default.query(`SELECT clientes.id, tipos_documentos.nombre AS documentos_id, clientes.identificacion, clientes.nombres, clientes.apellidos, clientes.telefono, clientes.email, clientes.nota, clientes.estado from ${table} INNER JOIN tipos_documentos ON clientes.documentos_id = tipos_documentos.id`);
            }
            else {
                data = yield database_1.default.query(`SELECT * from ${table}`);
            }
            res.send({ success: true, message: "Tabla listada", data: data[0] });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.query);
            const { table } = req.query;
            const { id } = req.params;
            //const cliente = await pool.query('SELECT * from clientes WHERE id = ?', [id]) //Esta es otra forma de hacerlo
            const cliente = yield database_1.default.query(`SELECT * from ${table} WHERE id = ${id}`);
            if (cliente[0].length > 0) {
                res.send({ message: "Cliente listado", clientes: cliente[0] });
            }
            else {
                res.status(404).json({ message: "No existe." });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = req.query;
            console.log(req.body);
            yield database_1.default.query(`INSERT INTO ${table} set ?`, [req.body]);
            res.send({ message: "Guardado con exito." });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = req.query;
            const { id } = req.params;
            yield database_1.default.query(`UPDATE ${table} set ? WHERE id = ${id}`, [req.body]);
            res.json({ message: "Actualizado con exito." });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = req.query;
            const { id } = req.params;
            yield database_1.default.query(`DELETE from ${table} WHERE id = ${id}`);
            res.send({ message: "Aliminado con exito." });
        });
    }
}
const gymController = new GymController();
exports.default = gymController;
