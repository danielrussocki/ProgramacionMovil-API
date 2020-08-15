"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const keys_1 = __importDefault(require("./keys"));
const Sequel = new sequelize_1.Sequelize({
    database: keys_1.default.database.database,
    username: keys_1.default.database.user,
    password: keys_1.default.database.password,
    dialect: 'mysql',
    host: keys_1.default.database.host,
    define: {
        timestamps: false
    }
});
Sequel.authenticate()
    .then(() => console.log('Sequalize connection has been successfully completed!'))
    .catch(err => console.error('Unable to connect to the database with sequalize:', err));
exports.default = Sequel;
