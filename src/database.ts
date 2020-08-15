import { Sequelize } from 'sequelize';
import keys from './keys';

const Sequel = new Sequelize({
    database: keys.database.database,
    username: keys.database.user,
    password: keys.database.password,
    dialect: 'mysql',
    host: keys.database.host,
    define: {
        timestamps: false
    }
});

Sequel.authenticate()
    .then(() => console.log('Sequalize connection has been successfully completed!'))
    .catch(err=>console.error('Unable to connect to the database with sequalize:', err));

export default Sequel;