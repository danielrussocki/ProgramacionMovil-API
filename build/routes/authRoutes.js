"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/register', authController_1.authController.registerUser);
        this.router.post('/login', authController_1.authController.loginUser);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
