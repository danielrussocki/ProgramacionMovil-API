import Sequel from '../database';
import { Sequelize } from 'sequelize';

const Notas = Sequel.define('notas', {
    id_nota: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo_nota: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion_nota: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_nota: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuario_nota: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Notas;