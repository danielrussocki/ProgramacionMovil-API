"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notasController_1 = require("../controllers/notasController");
const Auth_1 = __importDefault(require("../commons/Auth"));
class NotasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', Auth_1.default.validateToken, notasController_1.notasController.getAllNotes);
        this.router.get('/:id', Auth_1.default.validateToken, notasController_1.notasController.getNote);
        this.router.put('/:id', Auth_1.default.validateToken, notasController_1.notasController.editSimpleNote);
        this.router.delete('/:id', Auth_1.default.validateToken, notasController_1.notasController.deleteSimpleNote);
        this.router.post('/', Auth_1.default.validateToken, notasController_1.notasController.createSimpleNote);
    }
}
const notasRoutes = new NotasRoutes();
exports.default = notasRoutes.router;
