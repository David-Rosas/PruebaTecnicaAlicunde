import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';
import sequelize from './config/db';
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', bookRoutes);
app.use('/api', authorRoutes);

async function syncModels() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tablas sincronizadas con éxito.');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  }
}
syncModels();
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});