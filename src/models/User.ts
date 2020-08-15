import Sequel from '../database';
import { Sequelize } from 'sequelize';

const User = Sequel.define('usuarios', {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellidos_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo_user: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password_user: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default User;