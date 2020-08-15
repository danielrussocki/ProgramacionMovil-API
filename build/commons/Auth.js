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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    constructor() {
        this.AUTH_KEY = "PROGRAMACIONMOVIL";
    }
    validateToken(req, res, next) {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(401).send('Access denied!');
        try {
            jsonwebtoken_1.default.verify(token, "PROGRAMACIONMOVIL");
            next();
        }
        catch (err) {
            res.status(400).send('Invalid token!');
        }
    }
    generateToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const _token = jsonwebtoken_1.default.sign(data, this.AUTH_KEY, {
                expiresIn: 60 * 60 * 24
            });
            return _token;
        });
    }
    getToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const _token = jsonwebtoken_1.default.decode(data);
            return _token;
        });
    }
}
const auth = new Auth();
exports.default = auth;
