"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ msg: 'Bienvenido a la API de programación móvil' });
    }
}
exports.indexController = new IndexController();
