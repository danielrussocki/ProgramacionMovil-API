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
const User_1 = __importDefault(require("../models/User"));
const Auth_1 = __importDefault(require("../commons/Auth"));
// Creado correctamente - 1
// Bad request - 2
// Usuario ya existe - 3
// Acceso incorrecto - 4
// Contraseña incorrecta - 5
// Cuenta no existe - 6
// Campos vacíos - 7
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellidos, correo, password } = req.body;
            yield User_1.default.findOrCreate({
                where: {
                    correo_user: correo
                },
                defaults: {
                    nombre_user: nombre,
                    apellidos_user: apellidos,
                    correos_user: correo,
                    password_user: password
                }
            }).spread((user, created) => {
                if (created) {
                    return res.status(200).json({ _status: 1 });
                }
                res.status(400).json({ _status: 3 });
            }).catch((err) => {
                console.error(err);
                res.status(400).json({ _status: 2 });
            });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            yield User_1.default.findOne({
                where: {
                    correo_user: correo
                }
            }).then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user === null)
                    return res.status(400).json({ _status: 6 });
                yield User_1.default.findOne({
                    where: {
                        correo_user: correo,
                        password_user: password
                    }
                }).then((userWithPass) => {
                    if (userWithPass === null)
                        return res.status(400).json({ _status: 7 });
                    const beforeToken = userWithPass.dataValues;
                    Auth_1.default.generateToken(beforeToken).then(generated => {
                        return res.json({ token: generated });
                    }).catch(err => {
                        console.log(err);
                        return res.sendStatus(400);
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(401).json({ _status: 5 });
                });
            })).catch(err => {
                console.log(err);
                res.status(401).json({ _status: 4 });
            });
        });
    }
}
exports.authController = new AuthController();
