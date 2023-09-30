
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class BookAuthor extends Model {
  public id!: number;
  public BookId!: number;
  public AuthorId!: number;
}

BookAuthor.init(
  {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BookAuthor',
    tableName: 'BookAuthor', 
  }
);

BookAuthor.sync({ force: true }) 
  .then(() => {
    console.log('La tabla de autores se ha sincronizado con éxito.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla de autores:', error);
  });

export default BookAuthor;
