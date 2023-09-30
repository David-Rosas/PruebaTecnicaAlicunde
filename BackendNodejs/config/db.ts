import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',  // Cambia esto a la dirección de tu servidor MySQL
  username: 'root',
  password: 'My7Pass@Word_9_8A_zE',
  database: 'library',
});

export default sequelize;
