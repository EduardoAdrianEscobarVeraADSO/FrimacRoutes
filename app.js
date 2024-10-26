// Importar módulos necesarios
const express = require('express');
const sequelize = require('./config/database');

// Importar modelos
const Role = require('./models/role');
const User = require('./models/User');
const Truck = require('./models/Truck');
const Route = require('./models/Route');
const Client = require('./models/Client');
const ClientRoute = require('./models/ClientRoute');

// Crear una instancia de Express
const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto definido en el entorno o 3000 por defecto

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Importar las rutas
const rolesRoutes = require('./routes/roles');
const usersRoutes = require('./routes/users');
const trucksRoutes = require('./routes/trucks');
const routesRoutes = require('./routes/routes');
const clientsRoutes = require('./routes/clients');

// Registrar rutas en la aplicación
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/trucks', trucksRoutes);
app.use('/api/routes', routesRoutes);
app.use('/api/clients', clientsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
