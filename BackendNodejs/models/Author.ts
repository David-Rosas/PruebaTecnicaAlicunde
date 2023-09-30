import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Author extends Model {
  public id!: number;
  public name!: string;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Author',
  }
);

Author.sync({ force: true }) 
  .then(() => {
    console.log('La tabla de autores se ha sincronizado con éxito.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla de autores:', error);
  });
export default Author;
