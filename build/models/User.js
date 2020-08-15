"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
const User = database_1.default.define('usuarios', {
    id_user: {
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_user: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false
    },
    apellidos_user: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false
    },
    correo_user: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password_user: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false
    }
});
exports.default = User;
