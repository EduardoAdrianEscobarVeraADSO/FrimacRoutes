const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize('FrimacRoutes', 'root', 'Frimacproyect01*', {
  host: 'localhost',   // O la IP de tu servidor MySQL
  dialect: 'mysql',
});

module.exports = sequelize;
