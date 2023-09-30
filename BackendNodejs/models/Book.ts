import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Author from './Author';

class Book extends Model {
  public id!: number;
  public title!: string;
  public chapters!: number;
  public pages!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

Book.sync({ force: true }) 
  .then(() => {
    console.log('La tabla de autores se ha sincronizado con éxito.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla de autores:', error);
  });

Book.belongsToMany(Author, { through: 'BookAuthor' });

export default Book;
