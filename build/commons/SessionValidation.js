"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SessionValidation {
    validation(req, res, next) {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(401).send('Access denied!');
        try {
            jsonwebtoken_1.default.verify(token, 'PROGRAMACIONMOVIL');
            next();
        }
        catch (err) {
            res.status(400).send('Invalid token!');
        }
    }
}
const sessionValidation = new SessionValidation();
exports.default = sessionValidation;
