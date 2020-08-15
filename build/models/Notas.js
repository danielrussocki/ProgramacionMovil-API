"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
const Notas = database_1.default.define('notas', {
    id_nota: {
        type: sequelize_1.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo_nota: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false
    },
    descripcion_nota: {
        type: sequelize_1.Sequelize.STRING,
        allowNull: false
    },
    tipo_nota: {
        type: sequelize_1.Sequelize.INTEGER,
        allowNull: false
    },
    usuario_nota: {
        type: sequelize_1.Sequelize.INTEGER,
        allowNull: false
    }
});
exports.default = Notas;
