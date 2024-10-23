const sequelize = require('./config/database');
const Role = require('./models/role');
const User = require('./models/User');
const Truck = require('./models/Truck');
const Route = require('./models/Route');
const Client = require('./models/Client');
const ClientRoute = require('./models/ClientRoute');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincronizar todos los modelos
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
