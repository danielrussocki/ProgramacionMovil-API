"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Notas_1 = __importDefault(require("../models/Notas"));
const Auth_1 = __importDefault(require("../commons/Auth"));
// 1 - Nota creada exitosamente
// 2 - Nota no existe
// 3 - Editada correctamente
// 4 - Eliminada correctamente
class NotasController {
    getAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = req.headers['authorization'];
            yield Auth_1.default.getToken(authToken).then((decoded) => __awaiter(this, void 0, void 0, function* () {
                const { id_user } = decoded;
                yield Notas_1.default.findAll({
                    attributes: [
                        'id_nota', 'titulo_nota',
                        'descripcion_nota', 'tipo_nota'
                    ],
                    where: {
                        usuario_nota: id_user
                    }
                }).then(result => {
                    return res.send(result);
                    // return res.json({msg:'a'});
                }).catch(err => {
                    console.log(err);
                });
            })).catch(err => {
                console.log(err);
            });
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = req.headers['authorization'];
            const { id } = req.params;
            yield Auth_1.default.getToken(authToken).then((decoded) => __awaiter(this, void 0, void 0, function* () {
                const { id_user } = decoded;
                yield Notas_1.default.findOne({
                    where: {
                        id_nota: id,
                        usuario_nota: id_user
                    }
                }).then(result => {
                    if (result === null)
                        return res.status(404).json({ _status: 2 });
                    return res.send(result);
                }).catch(err => {
                    console.log(err);
                    return res.sendStatus(400);
                });
            })).catch(err => {
                console.log(err);
                return res.sendStatus(400);
            });
        });
    }
    createSimpleNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = req.headers['authorization'];
            yield Auth_1.default.getToken(authToken).then((decoded) => __awaiter(this, void 0, void 0, function* () {
                const { id_user } = decoded;
                const { titulo_nota, descripcion_nota, tipo_nota } = req.body;
                yield Notas_1.default.create({
                    id_nota: "",
                    titulo_nota: titulo_nota,
                    descripcion_nota: descripcion_nota,
                    tipo_nota: tipo_nota,
                    usuario_nota: id_user
                }).then(data => {
                    console.log(data);
                    res.status(200).json({ _status: 1 });
                }).catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
            })).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        });
    }
    editSimpleNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = req.headers['authorization'];
            yield Auth_1.default.getToken(authToken).then((decoded) => __awaiter(this, void 0, void 0, function* () {
                const { id_user } = decoded;
                const { id } = req.params;
                const { titulo_nota, descripcion_nota, tipo_nota } = req.body;
                yield Notas_1.default.update({
                    titulo_nota: titulo_nota,
                    descripcion_nota: descripcion_nota,
                    tipo_nota: tipo_nota
                }, {
                    where: {
                        id_nota: id,
                        usuario_nota: id_user
                    }
                }).then(result => {
                    return res.json({ _status: 3 });
                }).catch(err => {
                    console.log(err);
                    return res.sendStatus(400);
                });
            })).catch(err => {
                console.log(err);
                return res.sendStatus(400);
            });
        });
    }
    deleteSimpleNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = req.headers['authorization'];
            yield Auth_1.default.getToken(authToken).then((decoded) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const { id_user } = decoded;
                yield Notas_1.default.destroy({
                    where: {
                        id_nota: id,
                        usuario_nota: id_user
                    }
                }).then(result => {
                    return res.json({ _status: 4 });
                }).catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
            })).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        });
    }
}
exports.notasController = new NotasController();
