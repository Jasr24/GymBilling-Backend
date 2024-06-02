"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gymController_1 = __importDefault(require("./../controllers/gymController"));
class GymRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', gymController_1.default.list);
        this.router.get('/:id', gymController_1.default.getOne);
        // this.router.post('/', gymController.create);
        // this.router.put('/:id', gymController.update);
        // this.router.delete('/:id', gymController.delete);
    }
}
const gymRoutes = new GymRoutes();
exports.default = gymRoutes.router;
